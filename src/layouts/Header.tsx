import { useState } from "react";
import { FiSearch, FiBell, FiMessageSquare, FiMenu } from "react-icons/fi";

type Props = {
  onOpenMenu?: () => void;
};

export default function Header({ onOpenMenu }: Props) {
  const [query, setQuery] = useState("");

  return (
    <header className="top-0 z-40 w-full border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex h-16 items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            onClick={onOpenMenu}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700"
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          {/* Search */}
          <div className="flex-1">
            <label className="relative block">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FiSearch className="h-5 w-5" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="lg:w-96 w-full rounded-full border border-gray-200 pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-2">
            <button
              aria-label="Messages"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            >
              <FiMessageSquare className="h-5 w-5" />
            </button>
            <button
              aria-label="Notifications"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            >
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-medium text-white">4</span>
              <FiBell className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 leading-4">Linda Adora</div>
                <div className="text-[11px] text-gray-500">Admin</div>
              </div>
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


