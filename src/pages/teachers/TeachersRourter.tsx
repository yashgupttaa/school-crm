import { useSelector } from "react-redux";
import Layout from "../../layouts/Layout";
import TeacherDashboard from "../dashboard/TeacherDashboard";
import AdminTeachers from "./AdminTeachers";

export default function TeachersRouter() {
  // for now hardcode via selector to avoid auth dependency
  const role = useSelector((_state: any) => "admin");

  const renderTeachers = () => {
    switch (role) {
      case "admin":
        return <AdminTeachers />;
      case "teacher":
        return <TeacherDashboard />;
      default:
        return <div>Not Authorized</div>;
    }
  };

  return <Layout>{renderTeachers()}</Layout>;
}
