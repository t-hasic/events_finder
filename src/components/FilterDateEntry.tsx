import React, { useState } from "react";

interface FilterDateEntryProps {
  onDateChange: (date: string) => void;
}

const FilterDateEntry: React.FC<FilterDateEntryProps> = ({ onDateChange }) => {
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setIsOpen(!isOpen);
    onDateChange(e.target.value);
  };

  return (
    <div className="filter-date-entry">
      <button className="filter-date-toggle" onClick={handleToggle}>
        {date || "Select Date"}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="filter-date-input-container">
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="filter-date-input"
          />
        </div>
      )}
    </div>
  );
};

export default FilterDateEntry;
