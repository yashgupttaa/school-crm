import { Link, useLocation } from "react-router-dom";
import { sidebarConfig, type Role, type NavItem } from "../config/sidebar.config";

type Props = {
  role: Role;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ role, isOpen = false, onClose }: Props) {
  const { pathname } = useLocation();
  const config = sidebarConfig[role] ?? { menu: [], other: [] };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
        ${isActive(item.path) 
          ? "bg-blue-500 text-white" 
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span className="text-lg">{item.icon}</span>
      <span className={`text-sm font-medium ${isActive(item.path) ? "text-white" : "text-gray-700"}`}>
        {item.label}
      </span>
      {item.hasSubmenu && (
        <span className="ml-auto text-gray-400 group-hover:text-gray-600 text-xs">
          ▶
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-white border-r border-gray-100 flex-col">
      {/* Logo Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">SchoolHub</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-4">
        {/* MENU Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
            MENU
          </h3>
          <nav className="space-y-0.5">
            {config.menu.map(renderNavItem)}
          </nav>
        </div>

        {/* OTHER Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
            OTHER
          </h3>
          <nav className="space-y-0.5">
            {config.other.map(renderNavItem)}
          </nav>
        </div>
      </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`${isOpen ? "fixed" : "hidden"} inset-0 z-50 md:hidden`}> 
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <aside className={`absolute left-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl border-r border-gray-100 flex flex-col`}>
          <div className="p-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <h1 className="text-base font-bold text-gray-900">SchoolHub</h1>
            </div>
            <button onClick={onClose} className="text-gray-500 text-sm px-2 py-1 rounded hover:bg-gray-50">Close</button>
          </div>
          <div className="flex-1 px-3 space-y-4 overflow-y-auto">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">MENU</h3>
              <nav className="space-y-0.5">
                {config.menu.map(renderNavItem)}
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">OTHER</h3>
              <nav className="space-y-0.5">
                {config.other.map(renderNavItem)}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
