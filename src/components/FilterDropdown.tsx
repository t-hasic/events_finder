import React, { useState } from "react";

interface DropdownOption {
  value: any;
  label: any;
}

interface FilterDropdownProps {
  options: DropdownOption[];
  defaultOption: DropdownOption;
  onSelect: (option: DropdownOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="filter-dropdown">
      <button className="filter-dropdown-toggle" onClick={handleToggle}>
        {selectedOption.label}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="filter-dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
