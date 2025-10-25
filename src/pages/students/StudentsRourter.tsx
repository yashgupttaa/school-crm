import { useSelector } from "react-redux";
import Layout from "../../layouts/Layout";
import AdminStudents from "./AdminStudents";

export default function StudentsRouter() {
  // for now hardcode via selector to avoid auth dependency
  const role = useSelector((_state: any) => "admin");

  const renderStudents = () => {
    switch (role) {
      case "admin":
        return <AdminStudents />;
      case "teacher":
        return <div>Not Authorized</div>;
      default:
        return <div>Not Authorized</div>;
    }
  };

  return <Layout>{renderStudents()}</Layout>;
}
