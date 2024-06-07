import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { DatePicker } from './DatePicker';
import { Button, Stack } from '@chakra-ui/react';

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

  const handleClearDate = () => {
    setInternalDate(null);
    onDateChange(null);
  };

  return (
    <Stack direction="row" align="center">
      <DatePicker value={internalDate} onChange={handleDateChange} />
      <Button
        onClick={handleClearDate}
        size="sm"
        bg="secondarytext"
        color="white"
        _hover={{ bg: 'secondary', color: 'secondarytext' }}
      >
        Clear Date
      </Button>
    </Stack>
  );
};

export default CustomCalendar;
