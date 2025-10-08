import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRouter from "./pages/dashboard/DashboardRouter";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
