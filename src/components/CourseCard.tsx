import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { BookOpen, PenTool } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleQuizClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/quiz/${course.id}`);
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
          <p className="mt-2 text-gray-600">{course.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>View Course</span>
            </button>
            <button 
              onClick={handleQuizClick}
              className="flex items-center text-emerald-600 hover:text-emerald-800"
            >
              <PenTool className="h-5 w-5 mr-2" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};