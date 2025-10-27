import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { attendanceColumns, attendanceData } from "../../config/attendance.config";
import type { AttendanceRecord } from "../../models/attendance";
import Dropdown from "../../components/Dropdown";

const AdminAttendance: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("April 2024");
  const [selectedWeek, setSelectedWeek] = useState("Week 2-3");
  const [selectedClass, setSelectedClass] = useState("Class 11A");

  return (
    <div className="space-y-4">
      <DataTable<AttendanceRecord, any>
        title="Attendance"
        columns={attendanceColumns}
        data={attendanceData}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        rightActions={
          <div className="flex items-center gap-2">
            <Dropdown
              value={selectedMonth}
              onChange={setSelectedMonth}
              options={[
                { value: "April 2024", label: "April 2024" },
                { value: "May 2024", label: "May 2024" },
                { value: "June 2024", label: "June 2024" },
              ]}
            />
            <Dropdown
              value={selectedWeek}
              onChange={setSelectedWeek}
              options={[
                { value: "Week 2-3", label: "Week 2-3" },
                { value: "Week 4-5", label: "Week 4-5" },
                { value: "Week 6-7", label: "Week 6-7" },
              ]}
            />
            <Dropdown
              value={selectedClass}
              onChange={setSelectedClass}
              options={[
                { value: "Class 11A", label: "Class 11A" },
                { value: "Class 11B", label: "Class 11B" },
                { value: "Class 12A", label: "Class 12A" },
                { value: "Class 12B", label: "Class 12B" },
              ]}
            />
          </div>
        }
      />
    </div>
  );
};

export default AdminAttendance;
