import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getCourseQuiz = async (courseName: string) => {
  const response = await api.post('/get_course_quiz', { course_name: courseName });
  return response.data;
};

export const getRecommendations = async (correctAnswers: number) => {
  const response = await api.post('/recommend_sections', { correct_answers: correctAnswers });
  return response.data;
};