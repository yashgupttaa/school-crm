import type { AttendanceRecord } from "../models/attendance";
import { FiCheck, FiX } from "react-icons/fi";
import type { ColumnDef } from "@tanstack/react-table";

const generateDateColumns = (): ColumnDef<AttendanceRecord>[] => {
  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "studentName",
      header: "Student Name",
      cell: ({ row }) => (
        <div style={{ color: "var(--color-text-primary)" }}>{row.original.studentName}</div>
      ),
    },
  ];

  // Generate date columns from April 8 to April 21
  for (let day = 8; day <= 21; day++) {
    const date = `${day}`;
    columns.push({
      accessorKey: `attendance.${date}`,
      header: date,
      cell: ({ row }) => {
        const status = row.original.attendance[date];
        return (
          <div className="flex justify-center">
            {status === 'present' && (
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-text-secondary)" }}
              >
                <FiCheck className="text-white text-xs" />
              </div>
            )}
            {status === 'absent' && (
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-danger)" }}
              >
                <FiX className="text-white text-xs" />
              </div>
            )}
            {status === 'holiday' && (
              <div style={{ color: "var(--color-muted-text)" }} className="text-center">-</div>
            )}
          </div>
        );
      },
    });
  }

  return columns;
};

export const attendanceColumns = generateDateColumns();

export const attendanceData: AttendanceRecord[] = [
  {
    id: "1",
    studentName: "Lucas Johnson",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'absent',
    },
  },
  {
    id: "2",
    studentName: "Emily Peterson",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "3",
    studentName: "Michael Brown",
    attendance: {
      "8": 'present',
      "9": 'absent',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "4",
    studentName: "Hannah White",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "5",
    studentName: "Oliver Martinez",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "6",
    studentName: "Isabella Garcia",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "7",
    studentName: "Ethan Lee",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "8",
    studentName: "Sophia Wilson",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "9",
    studentName: "Aiden Taylor",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "10",
    studentName: "Ava Smith",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "11",
    studentName: "Nathan Anderson",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
  {
    id: "12",
    studentName: "Emma Davis",
    attendance: {
      "8": 'present',
      "9": 'present',
      "10": 'present',
      "11": 'present',
      "12": 'present',
      "13": 'holiday',
      "14": 'holiday',
      "15": 'present',
      "16": 'present',
      "17": 'present',
      "18": 'present',
      "19": 'present',
      "20": 'present',
      "21": 'present',
    },
  },
];

