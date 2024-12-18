import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseQuiz, getRecommendations } from '../services/api';

export const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getCourseQuiz(courseId!);
        console.log(data)
        if (data && data.questions) {
          setQuiz(data); // Set the quiz with the questions array
        } else {
          setError('Failed to load quiz data.');
        }
      } catch (error: any) {
        console.error('Error loading quiz:', error);
        setError('There was an error loading the quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [courseId]);

  const handleAnswer = async (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < quiz?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, get recommendations
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === quiz.questions[index].correctAnswer
      ).length;

      try {
        const recommendationData = await getRecommendations(correctAnswers);
        setRecommendations(recommendationData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('There was an error fetching recommendations. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="bg-red-200 p-6 rounded-lg">
          <p className="text-xl text-red-700">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 mt-4"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (recommendations) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg mb-4">
            Your level: <span className="font-semibold">{recommendations.user_level}</span>
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Recommendations:</h3>
            <ul className="list-disc pl-6">
              {recommendations.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
            <span className="text-gray-600">
              {currentQuestion + 1} of {quiz?.questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-indigo-600 rounded"
              style={{
                width: `${((currentQuestion + 1) / quiz?.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <p className="text-xl mb-8">{currentQuestionData?.question}</p>

        <div className="space-y-4">
          {currentQuestionData?.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
