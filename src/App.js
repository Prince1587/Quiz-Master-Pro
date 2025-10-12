import React, { useState } from 'react';
import { Home, Plus, BarChart3, History, Moon, Sun } from 'lucide-react';
import { QuizProvider, useQuizContext } from './context/QuizContext';
import QuizBuilder from './components/QuizBuilder';
import QuizList from './components/QuizList';
import QuizPlayer from './components/QuizPlayer';
import Statistics from './components/Statistics';
import QuizHistory from './components/QuizHistory';

const MainApp = () => {
  const [view, setView] = useState('home');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { darkMode, setDarkMode } = useQuizContext();

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setView('play');
  };

  const handleFinishQuiz = () => {
    setSelectedQuiz(null);
    setView('home');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100'} py-4 md:py-8 px-4`}>
      <div className="max-w-7xl mx-auto mb-4 md:mb-8">
        <div className={`flex flex-col md:flex-row items-center justify-between ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg p-4 md:p-6 border gap-4 md:gap-0`}>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Quiz Master Pro
          </h1>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full md:w-auto">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 md:p-3 rounded-xl transition-all ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setView('home')} className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base ${view === 'home' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button onClick={() => setView('create')} className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base ${view === 'create' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>
              <Plus size={18} />
              <span className="hidden sm:inline">Create</span>
            </button>
            <button onClick={() => setView('stats')} className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base ${view === 'stats' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>
              <BarChart3 size={18} />
              <span className="hidden sm:inline">Stats</span>
            </button>
            <button onClick={() => setView('history')} className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base ${view === 'history' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>
              <History size={18} />
              <span className="hidden sm:inline">History</span>
            </button>
          </div>
        </div>
      </div>

      {view === 'home' && <QuizList onStartQuiz={handleStartQuiz} />}
      {view === 'create' && <QuizBuilder />}
      {view === 'stats' && <Statistics />}
      {view === 'history' && <QuizHistory />}
      {view === 'play' && selectedQuiz && <QuizPlayer quiz={selectedQuiz} onFinish={handleFinishQuiz} />}
    </div>
  );
};

const App = () => {
  return (
    <QuizProvider>
      <MainApp />
    </QuizProvider>
  );
};

export default App;