import { ChangeEvent } from "react";

import FilterDropdown from "./FilterDropdown";
import FilterDateEntry from "./FilterDateEntry";

interface Props {
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onDateChange: (date: any) => void;
  onTimeChange: (time: any) => void;
}

function Input({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  onDateChange,
  onTimeChange,
}: Props) {
  const cityOptions = [{ value: "Boston", label: "Boston" }];

  const timeOptions = [
    { value: null, label: "Select Time" },
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
  ];

  const handleDateChange = (date: any) => {
    onDateChange(date);
  };

  const handleTimeChange = (option: { value: any; label: any }) => {
    onTimeChange(option.value);
  };

  const handleSelect = (option: { value: any; label: any }) => {
    console.log(`Selected option: ${option.label}`);
  };

  return (
    <div className="centered_input">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onKeyPress(e)}
        placeholder="Enter your query here..."
        className="query_text_input"
      />

      <FilterDropdown
        options={cityOptions}
        defaultOption={cityOptions[0]}
        onSelect={handleSelect}
      />
      <FilterDropdown
        options={timeOptions}
        defaultOption={timeOptions[0]}
        onSelect={handleTimeChange}
      />
      <FilterDateEntry onDateChange={handleDateChange} />

      <button
        onClick={onSubmit}
        className="btn btn-primary"
        style={{ margin: "8px" }}
      >
        Submit
      </button>
    </div>
  );
}

export default Input;
