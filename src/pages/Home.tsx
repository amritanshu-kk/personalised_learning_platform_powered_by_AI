import React from 'react';
import { CourseCard } from '../components/CourseCard';

const courses = [
  {
    id: 'introduction_to_AI',
    title: 'Introduction to AI',
    description: 'Learn the fundamentals of Artificial Intelligence and its applications.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    id: 'machine_learning_basics',
    title: 'Machine Learning Basics',
    description: 'Master the core concepts of Machine Learning algorithms and techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};