import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { TeacherExamPage } from './components/CreateExam';
import { Homepage } from './components/ExamHome';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-exam" element={<TeacherExamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
