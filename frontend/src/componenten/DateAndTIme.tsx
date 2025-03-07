import React, { useState } from "react";

interface DateAndTimeProps {
  onDateTimeChange?: (date: Date | null) => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({ onDateTimeChange }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedDateTime(newValue);
    if (onDateTimeChange) {
      onDateTimeChange(new Date(newValue));
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="datetime-picker">Select Travel Date & Time: </label>
      <input
        id="datetime-picker"
        type="datetime-local"
        value={selectedDateTime}
        onChange={handleChange}
        min={new Date().toISOString().slice(0, 16)}
        className="datetime-input"
      />
    </div>
  );
};

export default DateAndTime;