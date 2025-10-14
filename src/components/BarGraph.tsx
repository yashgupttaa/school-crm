import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

// Type definitions
interface AttendanceData {
  day: string;
  present: number;
  absent: number;
}

interface BarGraphProps {
  data: AttendanceData[];
  title?: string;
  timeFilter?: string;
  gradeFilter?: string;
  onTimeFilterChange?: (value: string) => void;
  onGradeFilterChange?: (value: string) => void;
}

const BarGraph: React.FC<BarGraphProps> = ({
  data,
  title = "Attendance",
  timeFilter = "Weekly",
  gradeFilter = "Grade 3",
  onTimeFilterChange,
  onGradeFilterChange,
}) => {
  const [hoveredBar, setHoveredBar] = useState<{ day: string; type: 'present' | 'absent' } | null>(null);

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(d => Math.max(d.present, d.absent)));

  // Calculate percentage for tooltip
  const getPercentage = (present: number, absent: number, type: 'present' | 'absent') => {
    const total = present + absent;
    if (total === 0) return 0;
    return Math.round((type === 'present' ? present : absent) / total * 100);
  };

  // Get bar height as percentage of max value
  const getBarHeight = (value: number) => {
    return (value / Math.max(maxValue, 1)) * 100;
  };

  return (
    <div className="rounded-lg border-gray-200 bg-white p-4 shadow-sm">
      {/* Header with title and filters */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <div className="flex gap-2">
          {/* Time Filter Dropdown */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => onTimeFilterChange?.(e.target.value)}
              className="appearance-none bg-gray-100 text-sm px-3 py-1.5 pr-8 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              style={{ 
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-text-gray)'
              }}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" 
              style={{ color: 'var(--color-text-primary)' }} />
          </div>

          {/* Grade Filter Dropdown */}
          <div className="relative">
            <select
              value={gradeFilter}
              onChange={(e) => onGradeFilterChange?.(e.target.value)}
              className="appearance-none bg-gray-100 text-sm px-3 py-1.5 pr-8 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              style={{ 
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-text-gray)'
              }}
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" 
              style={{ color: 'var(--color-text-primary)' }} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: 'var(--color-text-tertiary)' }}
          />
          <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
            Total Present
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: 'var(--color-text-quaternary)' }}
          />
          <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
            Total Absent
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative pb-6">
        {/* Grid lines + Y-axis labels spanning full width */}
        <div className="absolute left-0 right-0 top-0 bottom-6 pointer-events-none">
          {[100, 75, 50, 25, 0].map((value) => (
            <div key={value} className="absolute left-0 right-0" style={{ top: `${(100 - value)}%` }}>
              <div className="relative flex items-center">
                <div className="w-12 pr-2 text-right text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {value}
                </div>
                <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-text-gray)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Chart content */}
        <div className="relative h-56 pl-12">
          {/* Bars */}
          <div className="flex items-end justify-between h-full px-2">
            {data.map((dayData) => (
              <div key={dayData.day} className="flex items-end gap-2 relative h-full">
                {/* Present Bar */}
                <div className="relative group h-full flex items-end">
                  <div
                    className="w-4 lg:w-8 rounded-t cursor-pointer transition-all duration-200 hover:opacity-80"
                    style={{
                      height: `${getBarHeight(dayData.present)}%`,
                      backgroundColor: 'var(--color-text-tertiary)',
                      minHeight: '4px'
                    }}
                    onMouseEnter={() => setHoveredBar({ day: dayData.day, type: 'present' })}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  
                  {/* Tooltip */}
                  {hoveredBar?.day === dayData.day && hoveredBar?.type === 'present' && (
                    <div 
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg border z-10"
                      style={{ 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="text-center">
                        <div 
                          className="font-semibold text-sm"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {getPercentage(dayData.present, dayData.absent, 'present')}%
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          Present
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Absent Bar */}
                <div className="relative group h-full flex items-end">
                  <div
                    className="w-4 lg:w-8 rounded-t cursor-pointer transition-all duration-200 hover:opacity-80"
                    style={{
                      height: `${getBarHeight(dayData.absent)}%`,
                      backgroundColor: 'var(--color-text-quaternary)',
                      minHeight: '4px'
                    }}
                    onMouseEnter={() => setHoveredBar({ day: dayData.day, type: 'absent' })}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  
                  {/* Tooltip */}
                  {hoveredBar?.day === dayData.day && hoveredBar?.type === 'absent' && (
                    <div 
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg border z-10"
                      style={{ 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="text-center">
                        <div 
                          className="font-semibold text-sm"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {getPercentage(dayData.present, dayData.absent, 'absent')}%
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          Absent
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-2">
            {data.map((dayData) => (
              <div 
                key={dayData.day} 
                className="text-xs text-center"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {dayData.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
