import React, { createContext, useContext, useState } from 'react';
import { initialQuizzes } from '../data/initialQuizzes';

const QuizContext = createContext();

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuizContext must be used within QuizProvider');
  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [attempts, setAttempts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addQuiz = (quiz) => setQuizzes([...quizzes, { ...quiz, id: Date.now().toString() }]);
  const updateQuiz = (id, updatedQuiz) => setQuizzes(quizzes.map(q => q.id === id ? { ...updatedQuiz, id } : q));
  const deleteQuiz = (id) => setQuizzes(quizzes.filter(q => q.id !== id));
  const duplicateQuiz = (quiz) => addQuiz({ ...quiz, title: quiz.title + ' (Copy)' });
  const saveAttempt = (attempt) => setAttempts([...attempts, { ...attempt, id: Date.now().toString(), date: new Date().toISOString() }]);

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz, updateQuiz, deleteQuiz, duplicateQuiz, attempts, saveAttempt, darkMode, setDarkMode }}>
      {children}
    </QuizContext.Provider>
  );
};