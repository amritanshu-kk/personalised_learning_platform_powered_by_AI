import React from 'react';
import { FileText } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">PDF Preview</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded border"
            title="PDF Preview"
          />
        </div>
      </div>
    </div>
  );
};