export type AttendanceStatus = 'present' | 'absent' | 'holiday';

export type AttendanceRecord = {
  id: string;
  studentName: string;
  attendance: {
    [date: string]: AttendanceStatus;
  };
};

export type AttendanceData = AttendanceRecord[];

