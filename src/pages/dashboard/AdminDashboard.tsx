import React, { useState } from "react";
import StatsCard from "../../components/StatsCard";
import { AdminDashboardStats } from "../../config/AdminDashboard.config";
import StudentsGraph from "../../components/StudentsGraph";
import BarGraph from "../../components/BarGraph";
import { AttendanceData } from "../../config/AttendanceGraph.config";
import Calendar from "../../components/Calendar";
import AgendaData from "../../config/Agenda.config";
import Message from "../../components/Message";
import MessagesData from "../../config/Messages.config";
import EarningsGraph from "../../components/EarningsGraph";
import StatsMiniCard from "../../components/StatsMiniCard";
import { EarningsData } from "../../config/EarningsGrapg.config";
import { FiAward, FiBookOpen } from "react-icons/fi";
import StudentActivity from "../../components/StudentActivity";
import { StudentActivityData }   from "../../config/StudentActivity.config";
import NoticeBoard from "../../components/NoticeBoard";
import { NoticeBoardData } from "../../config/NoticeBoard.config";
import RecentActivity from "../../components/RecentActivity";
import { RecentActivityData } from "../../config/RecentActivity.config";

const AdminDashboard: React.FC = () => {

  const [timeFilter, setTimeFilter] = useState("Weekly");
  const [gradeFilter, setGradeFilter] = useState("Grade 3");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-4">

        {/* Stats Card */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {AdminDashboardStats.map((stat) => (
            <StatsCard title={stat.title} value={stat.value} deltaPercent={stat.deltaPercent} className={stat.className} />
          ))}
        </div>

        {/* Students Graph and Attendance Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <StudentsGraph boys={7400} girls={2600} />
          </div>
          <div className="lg:col-span-8">
            <BarGraph 
            data={AttendanceData}
            title="Attendance"
            timeFilter={timeFilter}
            gradeFilter={gradeFilter}
            onTimeFilterChange={setTimeFilter}
            onGradeFilterChange={setGradeFilter}
            />
          </div>
        </div>

        {/* Earnings Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <EarningsGraph
              data={EarningsData}
            />
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <StatsMiniCard icon={<FiBookOpen />} value={24680} label="Olympic Students" deltaPercent={15} />
            <StatsMiniCard icon={<FiAward />} value={3000} label="Competition" deltaPercent={-8} accent="var(--color-text-tertiary)" />
          </div>
        </div>
        
      </div>

      <div className="lg:col-span-4 space-y-4">
        {/* Calendar */}
        <div className="rounded-lg border-gray-200 bg-white shadow-sm">
          <Calendar view="week" events={AgendaData} />
        </div>
        {/* Message */}
        <div className="rounded-lg border-gray-200 bg-white shadow-sm">
          <Message items={MessagesData} />
        </div>
      </div>

      {/* Student Activity */}
      <div className="lg:col-span-3 space-y-4">
        <StudentActivity items={StudentActivityData} />
      </div>  

      {/* Notice Board */}
      <div className="lg:col-span-6 space-y-4">
        <NoticeBoard items={NoticeBoardData} />
      </div>

      {/* Recent Activity */}
      <div className="lg:col-span-3 space-y-4">
        <RecentActivity items={RecentActivityData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
