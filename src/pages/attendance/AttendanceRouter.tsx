import { useSelector } from "react-redux";
import Layout from "../../layouts/Layout";
import AdminAttendance from "./AdminAttendance";

export default function AttendanceRouter() {
  // for now hardcode via selector to avoid auth dependency
  const role = useSelector((_state: any) => "admin");

  const renderAttendance = () => {
    switch (role) {
      case "admin":
        return <AdminAttendance />;
      case "teacher":
        return <div>Not Authorized</div>;
      default:
        return <div>Not Authorized</div>;
    }
  };

  return <Layout>{renderAttendance()}</Layout>;
}
