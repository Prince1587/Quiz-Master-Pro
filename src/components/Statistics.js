import React from 'react';
import { BarChart3, Trophy, TrendingUp, Award } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';

const Statistics = () => {
  const { attempts, darkMode } = useQuizContext();
  const totalAttempts = attempts.length;
  const avgScore = attempts.length > 0 ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length).toFixed(1) : 0;
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.percentage)) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-3`}>
        <BarChart3 className="text-purple-600" size={28} />
        Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="text-purple-600" size={24} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Attempts</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{totalAttempts}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Score</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{avgScore}%</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="text-green-600" size={24} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Score</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{bestScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Recent Attempts</h3>
        <div className="space-y-3">
          {attempts.slice(-5).reverse().map((attempt) => (
            <div key={attempt.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 flex justify-between items-center`}>
              <div>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{attempt.quizTitle}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(attempt.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${attempt.percentage >= 70 ? 'text-green-600' : attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {attempt.percentage}%
                </p>
              </div>
            </div>
          ))}
          {attempts.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No attempts yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;