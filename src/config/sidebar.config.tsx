import type { ReactNode } from "react";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiLink,
  FiDollarSign,
  FiClipboard,
  FiCalendar,
  FiBook,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiAward,
  FiBarChart2,
  FiFileText,
} from "react-icons/fi";

// Types
export type Role = "admin" | "teacher";

export type NavItem = {
  label: string;
  path: string;
  icon: ReactNode;
  children?: NavItem[];
  hasSubmenu?: boolean;
};

// Role-wise nav config
export const sidebarConfig: Record<Role, { menu: NavItem[]; other: NavItem[] }> = {
  admin: {
    menu: [
      { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { label: "Teachers", path: "/dashboard/teachers", icon: <FiAward /> },
      { label: "Students", path: "/dashboard/students", icon: <FiUsers /> },
      { label: "Attendance", path: "/dashboard/attendance", icon: <FiLink /> },
      { label: "Finance", path: "/dashboard/finance", icon: <FiDollarSign />, hasSubmenu: true },
      { label: "Notice", path: "/dashboard/notice", icon: <FiClipboard /> },
      { label: "Calendar", path: "/dashboard/calendar", icon: <FiCalendar /> },
      { label: "Library", path: "/dashboard/library", icon: <FiBook /> },
      { label: "Message", path: "/dashboard/message", icon: <FiMessageSquare /> },
    ],
    other: [
      { label: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
      { label: "Setting", path: "/dashboard/settings", icon: <FiSettings /> },
      { label: "Log out", path: "/logout", icon: <FiLogOut /> },
    ],
  },
  teacher: {
    menu: [
      { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { label: "My Classes", path: "/dashboard/classes", icon: <FiAward /> },
      { label: "Students", path: "/dashboard/students", icon: <FiUsers /> },
      { label: "Attendance", path: "/dashboard/attendance", icon: <FiLink /> },
      { label: "Assignments", path: "/dashboard/assignments", icon: <FiFileText /> },
      { label: "Grades", path: "/dashboard/grades", icon: <FiBarChart2 /> },
      { label: "Calendar", path: "/dashboard/calendar", icon: <FiCalendar /> },
      { label: "Message", path: "/dashboard/message", icon: <FiMessageSquare /> },
    ],
    other: [
      { label: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
      { label: "Setting", path: "/dashboard/settings", icon: <FiSettings /> },
      { label: "Log out", path: "/logout", icon: <FiLogOut /> },
    ],
  },
};


