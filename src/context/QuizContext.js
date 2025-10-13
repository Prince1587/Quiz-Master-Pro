import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { initialQuizzes } from '../data/initialQuizzes';

const QuizContext = createContext();

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuizContext must be used within QuizProvider');
  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load data when user changes
  useEffect(() => {
    if (currentUser) {
      console.log('Loading data for user:', currentUser.uid);
      loadQuizzes();
      loadAttempts();
    } else {
      // Reset data when logged out
      setQuizzes([]);
      setAttempts([]);
      setLoading(false);
    }
  }, [currentUser]);

  const loadQuizzes = async () => {
    try {
      console.log('Loading quizzes from Firestore...');
      const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const quizzesData = [];
      
      querySnapshot.forEach((docSnap) => {
        quizzesData.push({ id: docSnap.id, ...docSnap.data() });
      });

      console.log('Loaded quizzes:', quizzesData.length);

      // If no quizzes exist, add initial quizzes
      if (quizzesData.length === 0) {
        console.log('No quizzes found, adding initial quizzes...');
        await addInitialQuizzes();
      } else {
        setQuizzes(quizzesData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setQuizzes(initialQuizzes);
      setLoading(false);
    }
  };

  const addInitialQuizzes = async () => {
    try {
      const addedQuizzes = [];
      for (const quiz of initialQuizzes) {
        const docRef = await addDoc(collection(db, 'quizzes'), {
          ...quiz,
          createdBy: currentUser?.uid || 'system',
          createdAt: new Date().toISOString()
        });
        addedQuizzes.push({ id: docRef.id, ...quiz });
      }
      setQuizzes(addedQuizzes);
      console.log('Initial quizzes added successfully');
    } catch (error) {
      console.error('Error adding initial quizzes:', error);
    }
  };

  const loadAttempts = async () => {
    if (!currentUser) {
      console.log('No user logged in, skipping attempts load');
      return;
    }
    
    try {
      console.log('Loading attempts for user:', currentUser.uid);
      const q = query(
        collection(db, 'attempts'), 
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const attemptsData = [];
      
      querySnapshot.forEach((docSnap) => {
        attemptsData.push({ id: docSnap.id, ...docSnap.data() });
      });
      
      console.log('Loaded attempts:', attemptsData.length);
      setAttempts(attemptsData);
    } catch (error) {
      console.error('Error loading attempts:', error);
      // If index doesn't exist yet, create it manually in Firebase Console
      if (error.code === 'failed-precondition') {
        console.error('Firestore index required. Creating index...');
        alert('Please wait while we set up your database. This is a one-time setup.');
      }
      setAttempts([]);
    }
  };

  const addQuiz = async (quiz) => {
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), {
        ...quiz,
        createdBy: currentUser?.uid || 'anonymous',
        createdAt: new Date().toISOString()
      });
      
      const newQuiz = { id: docRef.id, ...quiz, createdBy: currentUser?.uid, createdAt: new Date().toISOString() };
      setQuizzes([newQuiz, ...quizzes]);
      console.log('Quiz added successfully');
      return docRef.id;
    } catch (error) {
      console.error('Error adding quiz:', error);
      throw error;
    }
  };

  const updateQuiz = async (id, updatedQuiz) => {
    try {
      const quizRef = doc(db, 'quizzes', id);
      await updateDoc(quizRef, updatedQuiz);
      
      setQuizzes(quizzes.map(q => q.id === id ? { ...updatedQuiz, id } : q));
      console.log('Quiz updated successfully');
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await deleteDoc(doc(db, 'quizzes', id));
      setQuizzes(quizzes.filter(q => q.id !== id));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  };

  const duplicateQuiz = async (quiz) => {
    const newQuiz = { 
      ...quiz, 
      title: `${quiz.title} (Copy)`,
      createdBy: currentUser?.uid || 'anonymous',
      createdAt: new Date().toISOString()
    };
    delete newQuiz.id;
    await addQuiz(newQuiz);
  };

  const saveAttempt = async (attempt) => {
    if (!currentUser) {
      console.error('Cannot save attempt: No user logged in');
      return;
    }
    
    try {
      const attemptData = {
        ...attempt,
        userId: currentUser.uid,
        userName: currentUser.name,
        userEmail: currentUser.email,
        date: new Date().toISOString()
      };
      
      console.log('Saving attempt:', attemptData);
      
      const docRef = await addDoc(collection(db, 'attempts'), attemptData);
      
      const savedAttempt = { id: docRef.id, ...attemptData };
      setAttempts([savedAttempt, ...attempts]);
      
      console.log('Attempt saved successfully:', docRef.id);
    } catch (error) {
      console.error('Error saving attempt:', error);
      alert('Failed to save quiz attempt. Please try again.');
    }
  };

  const value = {
    quizzes,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    duplicateQuiz,
    attempts,
    saveAttempt,
    darkMode,
    setDarkMode,
    loading
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};