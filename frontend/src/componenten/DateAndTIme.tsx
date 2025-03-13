import React, { useState, useEffect } from "react";

// Define what an available date looks like
interface AvailableDateTime {
  id: number;
  dateTime: string;
  isAvailable: boolean;
}

interface DateAndTimeProps {
  onDateTimeChange?: (date: Date | null) => void;
  availableDates: AvailableDateTime[]; // Add this prop to receive available dates
}

const DateAndTime: React.FC<DateAndTimeProps> = ({
  onDateTimeChange,
  availableDates,
}) => {
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 16);

  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    "2025-03-11T11:00:00"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Debug: Print available dates when component mounts
  useEffect(() => {
    console.log("Available dates loaded:", availableDates);
  }, [availableDates]);

  // Check if a date is available in our database
  const isDateAvailable = (dateToCheck: string): boolean => {
    // Debug: Log the date we're checking
    console.log("Checking availability for:", dateToCheck);

    return availableDates.some(
      (date) => date.dateTime.slice(0, 16) === dateToCheck && date.isAvailable
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    console.log("User trying to select:", newValue);

    // Check if the selected date is available
    if (isDateAvailable(newValue)) {
      console.log("Date is available! Updating...");
      setSelectedDateTime(newValue);
      setErrorMessage("");

      if (onDateTimeChange) {
        onDateTimeChange(new Date(newValue));
      }
    } else {
      console.log("Date is not available!");
      setErrorMessage("Sorry, this date and time is not available! 😢");
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <label
        htmlFor="datetime-picker"
        style={{ display: "block", marginBottom: "10px" }}
      >
        Pick your travel date and time:
      </label>
      <input
        id="datetime-picker"
        type="datetime-local"
        value={selectedDateTime}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "2px solid #ddd",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      {errorMessage && (
        <div
          style={{
            color: "red",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Show available dates for debugging */}
      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        Available dates for testing:
        <ul>
          {availableDates.map((date) => (
            <li key={date.id}>
              {new Date(date.dateTime).toLocaleString()}
              {date.isAvailable ? " ✅" : " ❌"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateAndTime;
