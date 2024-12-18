import React from 'react';
import { CourseContent as CourseContentType } from '../types';
import { ChevronRight } from 'lucide-react';

interface CourseContentProps {
  content: CourseContentType;
}

export const CourseContent: React.FC<CourseContentProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{content.title}</h2>
      <div className="space-y-6">
        {content.chapters.map((chapter, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ChevronRight className="h-5 w-5 text-indigo-600 mr-2" />
              {chapter.title}
            </h3>
            <div className="pl-7 space-y-2">
              {chapter.content.map((text, idx) => (
                <p key={idx} className="text-gray-600">{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};