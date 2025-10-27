import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import TeachersRouter from "./pages/teachers/TeachersRourter";
import StudentsRouter from "./pages/students/StudentsRourter";
import AttendanceRouter from "./pages/attendance/AttendanceRouter";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/teachers" element={<TeachersRouter />} />
      <Route path="/students" element={<StudentsRouter />} />
      <Route path="/attendance" element={<AttendanceRouter />} />
    </Routes>
  );
}

export default App;
