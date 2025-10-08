// Types
export type Role = "admin" | "teacher";

export type NavItem = {
  label: string;
  path: string;
  icon: string;       
  children?: NavItem[];
  hasSubmenu?: boolean;
};

// Role-wise nav config
export const sidebarConfig: Record<Role, { menu: NavItem[], other: NavItem[] }> = {
  admin: {
    menu: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "Teachers", path: "/dashboard/teachers", icon: "🎓" },
      { label: "Students", path: "/dashboard/students", icon: "👥" },
      { label: "Attendance", path: "/dashboard/attendance", icon: "🔗" },
      { label: "Finance", path: "/dashboard/finance", icon: "💰", hasSubmenu: true },
      { label: "Notice", path: "/dashboard/notice", icon: "📋" },
      { label: "Calendar", path: "/dashboard/calendar", icon: "📅" },
      { label: "Library", path: "/dashboard/library", icon: "📖" },
      { label: "Message", path: "/dashboard/message", icon: "💬" },
    ],
    other: [
      { label: "Profile", path: "/dashboard/profile", icon: "👤" },
      { label: "Setting", path: "/dashboard/settings", icon: "⚙️" },
      { label: "Log out", path: "/logout", icon: "↗️" },
    ]
  },
  teacher: {
    menu: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "My Classes", path: "/dashboard/classes", icon: "🎓" },
      { label: "Students", path: "/dashboard/students", icon: "👥" },
      { label: "Attendance", path: "/dashboard/attendance", icon: "🔗" },
      { label: "Assignments", path: "/dashboard/assignments", icon: "📝" },
      { label: "Grades", path: "/dashboard/grades", icon: "📊" },
      { label: "Calendar", path: "/dashboard/calendar", icon: "📅" },
      { label: "Message", path: "/dashboard/message", icon: "💬" },
    ],
    other: [
      { label: "Profile", path: "/dashboard/profile", icon: "👤" },
      { label: "Setting", path: "/dashboard/settings", icon: "⚙️" },
      { label: "Log out", path: "/logout", icon: "↗️" },
    ]
  },
};
