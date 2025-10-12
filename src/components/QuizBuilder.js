import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';

const QuizBuilder = () => {
  const { addQuiz, darkMode } = useQuizContext();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [difficulty, setDifficulty] = useState('Medium');
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [questions, setQuestions] = useState([{ 
    id: '1', 
    question: '', 
    options: ['', '', '', ''], 
    correctAnswer: 0, 
    explanation: '' 
  }]);

  const addNewQuestion = () => {
    const newQ = { 
      id: Date.now().toString(), 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: 0, 
      explanation: '' 
    };
    setQuestions([...questions, newQ]);
  };

  const updateQ = (idx, field, val) => {
    const newQuestions = [...questions];
    newQuestions[idx] = { ...newQuestions[idx], [field]: val };
    setQuestions(newQuestions);
  };

  const updateOpt = (qIdx, oIdx, val) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[oIdx] = val;
    setQuestions(newQuestions);
  };

  const removeQ = (idx) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q, i) => i !== idx));
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter quiz title');
      return;
    }
    addQuiz({ title, category, difficulty, questions, timePerQuestion, negativeMarking });
    setTitle('');
    setQuestions([{ id: '1', question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }]);
    alert('Quiz created successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-3`}>
          <Plus className="text-purple-600" size={32} />
          Create Quiz
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Quiz Title" 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
          />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option>General</option>
            <option>Science</option>
            <option>Programming</option>
            <option>Math</option>
            <option>History</option>
          </select>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)} 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input 
            type="number" 
            value={timePerQuestion} 
            onChange={(e) => setTimePerQuestion(Number(e.target.value))} 
            placeholder="Time per Q" 
            className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
          />
        </div>

        <label className="flex items-center gap-3 mb-6">
          <input type="checkbox" checked={negativeMarking} onChange={(e) => setNegativeMarking(e.target.checked)} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Negative Marking</span>
        </label>

        {questions.map((q, qIdx) => (
          <div key={q.id} className={`mb-6 p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between mb-4">
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Question {qIdx + 1}</h3>
              {questions.length > 1 && (
                <button onClick={() => removeQ(qIdx)} className="text-red-500">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
            
            <input 
              type="text" 
              value={q.question} 
              onChange={(e) => updateQ(qIdx, 'question', e.target.value)} 
              placeholder="Enter question" 
              className={`w-full px-4 py-3 mb-4 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`} 
            />

            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-3 mb-3">
                <input 
                  type="radio" 
                  checked={q.correctAnswer === oIdx} 
                  onChange={() => updateQ(qIdx, 'correctAnswer', oIdx)} 
                />
                <input 
                  type="text" 
                  value={opt} 
                  onChange={(e) => updateOpt(qIdx, oIdx, e.target.value)} 
                  placeholder={`Option ${oIdx + 1}`} 
                  className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`} 
                />
              </div>
            ))}

            <textarea 
              value={q.explanation} 
              onChange={(e) => updateQ(qIdx, 'explanation', e.target.value)} 
              placeholder="Explanation (optional)" 
              className={`w-full px-4 py-3 mt-4 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'}`} 
              rows="2"
            />
          </div>
        ))}

        <div className="flex gap-4">
          <button onClick={addNewQuestion} className={`px-6 py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
            <Plus size={20} className="inline mr-2" />
            Add Question
          </button>
          <button onClick={handleSave} className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold">
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;