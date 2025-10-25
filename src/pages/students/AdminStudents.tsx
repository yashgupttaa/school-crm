import React, { useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { FiFilter, FiDownload, FiPlus, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { StudentsData } from "../../config/students.config";
import type { Student } from "../../models/students";

const AdminStudents: React.FC = () => {
  const [filter, setFilter] = useState("");

  const columns = useMemo<ColumnDef<Student>[]>(() => [
    {
      id: "select",
      header: () => <input type="checkbox" className="h-4 w-4 rounded" />,
      cell: () => <input type="checkbox" className="h-4 w-4 rounded" />,
      size: 30,
    },
    {
      header: "Student Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.avatar} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>{row.original.name}</div>
            <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>{row.original.email}</div>
          </div>
        </div>
      ),
    },
    { header: "Class", accessorKey: "class" },
    { header: "Gender", accessorKey: "gender" },
    { header: "Date of Birth", accessorKey: "dob" },
    { header: "Parent Phone", accessorKey: "parentPhone" },
    { header: "Phone Number", accessorKey: "phone" },
    { header: "Address", accessorKey: "address" },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-3 text-gray-500">
          <button title="view" className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"><FiEye /></button>
          <button title="edit" className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"><FiEdit /></button>
          <button title="trash" className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"><FiTrash /></button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-4">
      <DataTable<Student, any>
        title="All Students List"
        columns={columns}
        data={StudentsData}
        globalFilter={filter}
        onGlobalFilterChange={setFilter}
        rightActions={
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "var(--agenda-yellow-bg)" }}><FiFilter /></button>
            <button className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "var(--agenda-yellow-bg)" }}><FiDownload /></button>
            <button className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "var(--agenda-yellow-bg)" }}><FiPlus /></button>
          </div>
        }
      />
    </div>
  );
};

export default AdminStudents;