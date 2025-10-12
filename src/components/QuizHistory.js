import React from 'react';
import { History } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';

const QuizHistory = () => {
  const { attempts, darkMode } = useQuizContext();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-3`}>
        <History className="text-purple-600" size={28} />
        Quiz History
      </h2>

      <div className="space-y-4">
        {attempts.slice().reverse().map((attempt) => (
          <div key={attempt.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{attempt.quizTitle}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(attempt.date).toLocaleString()}</p>
              </div>
              <p className={`text-3xl font-bold ${attempt.percentage >= 70 ? 'text-green-600' : attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {attempt.percentage}%
              </p>
            </div>
          </div>
        ))}
        {attempts.length === 0 && (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-xl">No quiz history yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;