import React from "react";
import { FiChevronDown } from "react-icons/fi";

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  disabled = false,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`appearance-none bg-gray-100 text-sm px-3 py-1.5 pr-8 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        style={{
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-text-gray)",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FiChevronDown
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none"
        style={{ color: "var(--color-text-primary)" }}
      />
    </div>
  );
};

export default Dropdown;

