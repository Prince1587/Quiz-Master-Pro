import React, { useState, useEffect } from 'react';
import {
  Clock,
  Pause,
  PlayCircle,
  Lightbulb,
  ChevronRight,
  Trophy,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizPlayer = ({ quiz, onFinish }) => {
  const { saveAttempt, darkMode } = useQuizContext();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!finished && !paused && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      handleNext();
    }
  }, [timeLeft, finished, paused]);

  const handleAnswer = (idx) => {
    setAnswers({ ...answers, [current]: idx });
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(quiz.timePerQuestion);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, q, idx) => {
      if (answers[idx] === q.correctAnswer) return score + 1;
      else if (quiz.negativeMarking && answers[idx] !== undefined)
        return score - 0.25;
      return score;
    }, 0);
  };

  const finishQuiz = () => {
    setFinished(true);
    const score = calculateScore();
    const totalTime = Math.floor((Date.now() - startTime) / 1000);

    const attemptData = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      totalTime,
      answers
    };

    console.log('Saving attempt:', attemptData);
    saveAttempt(attemptData);
    toast.success('🎉 Quiz attempt saved successfully!');
  };

  if (finished) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4">
        <ToastContainer position="top-center" autoClose={2000} />
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-2xl p-8 border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="text-center mb-8">
            <Trophy className="mx-auto text-purple-600 mb-4" size={64} />
            <h2
              className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              } mb-2`}
            >
              Quiz Complete!
            </h2>
          </div>

          <div
            className={`${
              darkMode ? 'bg-gray-700' : 'bg-purple-50'
            } rounded-xl p-8 mb-8 text-center`}
          >
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {percentage}%
            </div>
            <div
              className={`text-xl ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Score: {score.toFixed(2)} / {quiz.questions.length}
            </div>
          </div>

          <h3
            className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            } mb-4`}
          >
            Review
          </h3>

          {quiz.questions.map((q, idx) => {
            const userAns = answers[idx];
            const correct = userAns === q.correctAnswer;

            return (
              <div
                key={idx}
                className={`mb-4 p-6 rounded-xl border-2 ${
                  correct
                    ? darkMode
                      ? 'bg-green-900 border-green-700'
                      : 'bg-green-50 border-green-300'
                    : darkMode
                    ? 'bg-red-900 border-red-700'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {correct ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-semibold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      Q{idx + 1}. {q.question}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Your answer:{' '}
                      <span
                        className={
                          correct
                            ? 'text-green-700 font-semibold'
                            : 'text-red-700 font-semibold'
                        }
                      >
                        {q.options[userAns] || 'Not answered'}
                      </span>
                    </p>
                    {!correct && (
                      <p
                        className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Correct:{' '}
                        <span className="text-green-700 font-semibold">
                          {q.options[q.correctAnswer]}
                        </span>
                      </p>
                    )}
                    {q.explanation && (
                      <p
                        className={`text-sm mt-2 italic ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <Lightbulb size={14} className="inline mr-1" />
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={onFinish}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* ✅ Dev-only Test Button */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={async () => {
            const testAttempt = {
              quizId: 'test',
              quizTitle: 'Test Quiz',
              score: 5,
              totalQuestions: 10,
              percentage: 50,
              totalTime: 60
            };
            await saveAttempt(testAttempt);
            toast.success('🧪 Test attempt saved!');
          }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-lg mb-4"
        >
          Test Save Attempt
        </button>
      )}

      <div
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-2xl overflow-hidden border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPaused(!paused)}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition"
              >
                {paused ? <PlayCircle size={20} /> : <Pause size={20} />}
              </button>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <Clock size={20} />
                <span className="text-lg font-semibold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>
              Question {current + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: progress + '%' }}
            />
          </div>
        </div>

        {paused ? (
          <div className="p-16 text-center">
            <Pause
              className={`mx-auto mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
              size={64}
            />
            <h3
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              } mb-2`}
            >
              Paused
            </h3>
            <button
              onClick={() => setPaused(false)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold mt-4 hover:from-purple-700 hover:to-blue-700 transition"
            >
              Resume
            </button>
          </div>
        ) : (
          <div className="p-8">
            <h3
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              } mb-8`}
            >
              {question.question}
            </h3>

            {showHint && question.explanation && (
              <div
                className={`mb-6 p-4 border-2 rounded-xl ${
                  darkMode
                    ? 'bg-yellow-900 border-yellow-700'
                    : 'bg-yellow-50 border-yellow-300'
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? 'text-yellow-200' : 'text-yellow-800'
                  }`}
                >
                  <Lightbulb size={16} className="inline mr-2" />
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
                    answers[current] === idx
                      ? 'bg-purple-600 text-white border-purple-600 transform scale-105 shadow-lg'
                      : darkMode
                      ? 'bg-gray-700 border-gray-600 text-white hover:border-purple-400'
                      : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        answers[current] === idx
                          ? 'bg-white text-purple-600 border-white'
                          : darkMode
                          ? 'border-gray-500 text-gray-400'
                          : 'border-gray-400 text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className={`px-6 py-4 rounded-xl font-semibold ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition`}
              >
                <Lightbulb size={20} className="inline mr-2" />
                {showHint ? 'Hide' : 'Show'} Hint
              </button>
              <button
                onClick={handleNext}
                disabled={answers[current] === undefined}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition"
              >
                {current < quiz.questions.length - 1 ? 'Next' : 'Finish'}
                <ChevronRight size={20} className="inline ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
