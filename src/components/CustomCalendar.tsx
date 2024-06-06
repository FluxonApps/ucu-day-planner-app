import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { DatePicker } from './DatePicker';

const CustomCalendar = () => {
  const [newDeadline, setNewDeadline] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
    const timestamp = date ? Timestamp.fromDate(date) : null;
    console.log(date);
    console.log(timestamp);

    setNewDeadline(timestamp);
    console.log(newDeadline);
  };

  return (
    <Box p={4}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </Box>
  );
};

export default CustomCalendar;
