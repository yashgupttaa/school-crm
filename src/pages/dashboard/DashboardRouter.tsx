import { useSelector } from "react-redux";
import Layout from "../../layouts/Layout";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default function DashboardRouter() {
  // for now hardcode via selector to avoid auth dependency
  const role = useSelector((_state: any) => "admin");

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      default:
        return <div>Not Authorized</div>;
    }
  };

  return <Layout>{renderDashboard()}</Layout>;
}
