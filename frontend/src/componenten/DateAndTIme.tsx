import React, { useState } from "react";

interface DateAndTimeProps {
  onDateTimeChange?: (date: Date | null) => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({ onDateTimeChange }) => {
 const [selectedDateTime, setSelectedDateTime] = useState<string>(
  "2025-03-10T10:00"
);

  console.log(selectedDateTime);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedDateTime(newValue);
    if (onDateTimeChange) {
      onDateTimeChange(new Date(newValue));
    }
  };

  console.log("after date and time");

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="datetime-picker">Select Travel Date & Time: </label>
      <input
        id="datetime-picker"
        type="datetime-local"
        value={selectedDateTime}
        onChange={handleChange}
        className="datetime-input"
      />
    </div>
  );
};

export default DateAndTime;