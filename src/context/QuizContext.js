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

  // Load quizzes from Firestore
  useEffect(() => {
    if (currentUser) {
      loadQuizzes();
      loadAttempts();
    } else {
      // Use initial quizzes if not logged in
      setQuizzes(initialQuizzes);
      setLoading(false);
    }
  }, [currentUser]);

  const loadQuizzes = async () => {
    try {
      const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const quizzesData = [];
      
      querySnapshot.forEach((doc) => {
        quizzesData.push({ id: doc.id, ...doc.data() });
      });

      // If no quizzes exist, add initial quizzes
      if (quizzesData.length === 0) {
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
      for (const quiz of initialQuizzes) {
        await addDoc(collection(db, 'quizzes'), {
          ...quiz,
          createdBy: currentUser?.uid || 'system',
          createdAt: new Date().toISOString()
        });
      }
      await loadQuizzes();
    } catch (error) {
      console.error('Error adding initial quizzes:', error);
    }
  };

  const loadAttempts = async () => {
    if (!currentUser) return;
    
    try {
      const q = query(
        collection(db, 'attempts'), 
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const attemptsData = [];
      
      querySnapshot.forEach((doc) => {
        attemptsData.push({ id: doc.id, ...doc.data() });
      });
      
      setAttempts(attemptsData);
    } catch (error) {
      console.error('Error loading attempts:', error);
    }
  };

  const addQuiz = async (quiz) => {
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), {
        ...quiz,
        createdBy: currentUser?.uid || 'anonymous',
        createdAt: new Date().toISOString()
      });
      
      const newQuiz = { id: docRef.id, ...quiz };
      setQuizzes([newQuiz, ...quizzes]);
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
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await deleteDoc(doc(db, 'quizzes', id));
      setQuizzes(quizzes.filter(q => q.id !== id));
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
    if (!currentUser) return;
    
    try {
      const attemptData = {
        ...attempt,
        userId: currentUser.uid,
        userName: currentUser.name,
        date: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'attempts'), attemptData);
      
      setAttempts([{ id: docRef.id, ...attemptData }, ...attempts]);
    } catch (error) {
      console.error('Error saving attempt:', error);
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