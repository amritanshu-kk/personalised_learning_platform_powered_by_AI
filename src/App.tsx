import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Quiz } from './pages/Quiz';
import { CourseDetails } from './pages/CourseDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/quiz/:courseId" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;