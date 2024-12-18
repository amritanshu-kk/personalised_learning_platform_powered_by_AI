import { CourseContent } from '../types';

export const fetchCourseContent = async (courseId: string): Promise<CourseContent> => {
  try {
    const response = await fetch(`/courses/${courseId}.pdf`);
    const text = await response.text();
    return parsePdfContent(text);
  } catch (error) {
    console.error('Error fetching course content:', error);
    throw error;
  }
};

const parsePdfContent = (content: string): CourseContent => {
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0];
  const chapters: any[] = [];
  let currentChapter: any = null;

  lines.slice(1).forEach(line => {
    if (line.startsWith('Chapter')) {
      if (currentChapter) {
        chapters.push(currentChapter);
      }
      currentChapter = {
        title: line,
        content: []
      };
    } else if (currentChapter) {
      currentChapter.content.push(line);
    }
  });

  if (currentChapter) {
    chapters.push(currentChapter);
  }

  return { title, chapters };
};