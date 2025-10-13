import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Trophy, LogOut, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const { attempts: contextAttempts, saveAttempt, darkMode } = useQuizContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [attempts, setAttempts] = useState(contextAttempts);
  const [testSaved, setTestSaved] = useState(false);

  useEffect(() => {
    setAttempts(contextAttempts);
  }, [contextAttempts]);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        navigate('/auth');
      } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to logout. Please try again.');
      }
    }
  };

  const handleSaveProfile = async () => {
    setIsEditing(false);
    alert('Profile update feature coming soon!');
  };

  const totalQuizzes = attempts.length;
  const avgScore = attempts.length > 0
    ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length).toFixed(1)
    : 0;
  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map(a => a.percentage))
    : 0;

  const handleTestSave = async () => {
    const testAttempt = {
      id: Date.now(),
      quizId: 'test',
      quizTitle: 'Test Quiz',
      score: 5,
      totalQuestions: 10,
      percentage: 50,
      totalTime: 60,
      date: new Date().toISOString()
    };
    await saveAttempt(testAttempt);
    setAttempts(prev => [testAttempt, ...prev]);
    setTestSaved(true);
    alert('Test attempt saved! Stats updated!');
  };

  return (
    <div className={`max-w-4xl mx-auto px-4`}>
      <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-8 flex items-center gap-3`}>
        <User className="text-purple-600" size={32} />
        My Profile
      </h2>

      {/* Profile Card */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-2xl p-8 border mb-8`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left w-full">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full px-4 py-2 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  placeholder="Your name"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(currentUser?.name || '');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentUser?.name || 'User'}
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <Edit2 size={18} className="text-purple-600" />
                  </button>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-2">
                  <Mail size={18} />
                  <p className="text-sm md:text-base">{currentUser?.email}</p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-4">
                  <Calendar size={18} />
                  <p className="text-sm">
                    Joined {currentUser?.createdAt
                      ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : 'Recently'}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'}`}>
                    Quiz Master
                  </span>
                  {totalQuizzes >= 10 && (
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700'}`}>
                      🏆 10+ Quizzes
                    </span>
                  )}
                  {avgScore >= 80 && (
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>
                      ⭐ High Achiever
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg p-6 border text-center`}>
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-purple-600" size={32} />
          </div>
          <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            {totalQuizzes}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Quizzes</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg p-6 border text-center`}>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-blue-600" size={32} />
          </div>
          <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            {avgScore}%
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Score</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg p-6 border text-center`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-green-600" size={32} />
          </div>
          <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            {bestScore}%
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Score</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg p-6 border mb-8`}>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          Recent Activity
        </h3>
        <div className="space-y-3">
          {attempts.slice(0, 5).map((attempt) => (
            <div key={attempt.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 flex justify-between items-center`}>
              <div>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {attempt.quizTitle}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(attempt.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${attempt.percentage >= 70 ? 'text-green-600' : attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {attempt.percentage}%
                </p>
              </div>
            </div>
          ))}
          {attempts.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No quiz attempts yet. Start taking quizzes!
            </p>
          )}
        </div>
      </div>
      

      {/* Logout Button */}
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
