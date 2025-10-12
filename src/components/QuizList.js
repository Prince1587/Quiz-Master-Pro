import React, { useState } from 'react';
import { Award, Play, Copy, Trash2 } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';

const QuizList = ({ onStartQuiz }) => {
  const { quizzes, deleteQuiz, duplicateQuiz, darkMode } = useQuizContext();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [diffFilter, setDiffFilter] = useState('All');

  const filtered = quizzes.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter === 'All' || q.category === catFilter) &&
    (diffFilter === 'All' || q.difficulty === diffFilter)
  );

  const getDiffColor = (d) => d === 'Easy' ? 'bg-green-500' : d === 'Medium' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search..." 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
          />
          <select 
            value={catFilter} 
            onChange={(e) => setCatFilter(e.target.value)} 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option>All</option>
            <option>General</option>
            <option>Science</option>
            <option>Programming</option>
            <option>Math</option>
            <option>History</option>
          </select>
          <select 
            value={diffFilter} 
            onChange={(e) => setDiffFilter(e.target.value)} 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-3`}>
        <Award className="text-purple-600" size={32} />
        Quizzes ({filtered.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((quiz) => (
          <div key={quiz.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 text-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{quiz.title}</h3>
                <span className={`${getDiffColor(quiz.difficulty)} px-3 py-1 rounded-full text-xs font-bold`}>
                  {quiz.difficulty}
                </span>
              </div>
              <p className="text-sm">{quiz.questions.length} Questions</p>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2">
                <button onClick={() => onStartQuiz(quiz)} className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition">
                  <Play size={18} className="inline mr-2" />
                  Start
                </button>
                <button onClick={() => duplicateQuiz(quiz)} className={`px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'} transition`}>
                  <Copy size={18} />
                </button>
                <button onClick={() => deleteQuiz(quiz.id)} className={`px-4 py-3 rounded-xl ${darkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-100 hover:bg-red-200'} transition`}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-xl">No quizzes found. Try different filters!</p>
        </div>
      )}
    </div>
  );
};

export default QuizList;