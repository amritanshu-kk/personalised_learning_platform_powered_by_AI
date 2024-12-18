import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseContent } from '../components/CourseContent';
import { PDFViewer } from '../components/PDFViewer';
import { fetchCourseContent } from '../services/courseService';
import { FileText, Play } from 'lucide-react';
import type { CourseContent as CourseContentType } from '../types';

export const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<CourseContentType | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchCourseContent(courseId!);
        setContent(data);
      } catch (error) {
        console.error('Error loading course content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content?.title}</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPdfPreview(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
            >
              <FileText className="h-5 w-5" />
              <span>Preview PDF</span>
            </button>
            <button
              onClick={() => navigate(`/quiz/${courseId}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Play className="h-5 w-5" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>

        {content && <CourseContent content={content} />}

        {showPdfPreview && (
          <PDFViewer
            pdfUrl={`/courses/${courseId}.pdf`}
            onClose={() => setShowPdfPreview(false)}
          />
        )}
      </div>
    </div>
  );
};