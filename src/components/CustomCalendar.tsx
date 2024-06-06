import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { DatePicker } from './DatePicker';

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  const [internalDate, setInternalDate] = useState(selectedDate ? new Date(selectedDate) : null);

  useEffect(() => {
    setInternalDate(selectedDate ? new Date(selectedDate) : null);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    const timestamp = date ? Timestamp.fromDate(date) : null;
    setInternalDate(date);
    onDateChange(timestamp);
  };

  return (
    <DatePicker
      value={internalDate}
      onChange={handleDateChange}
    />
  );
};

export default CustomCalendar;
