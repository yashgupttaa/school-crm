import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import TeachersRouter from "./pages/teachers/TeachersRourter";
import StudentsRouter from "./pages/students/StudentsRourter";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/teachers" element={<TeachersRouter />} />
      <Route path="/students" element={<StudentsRouter />} />
    </Routes>
  );
}

export default App;
