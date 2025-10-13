import React from "react";
import StatsCard from "../../components/StatsCard";
import { AdminDashboardStats } from "../../config/AdminDashboard.config";
import StudentsGraph from "../../components/StudentsGraph";

const AdminDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {AdminDashboardStats.map((stat) => (
            <StatsCard title={stat.title} value={stat.value} deltaPercent={stat.deltaPercent} className={stat.className} />
          ))}
        </div>
        <StudentsGraph boys={45414} girls={40270} />
      </div>
      <div className="lg:col-span-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-sm text-gray-600">Sidebar widgets go here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
