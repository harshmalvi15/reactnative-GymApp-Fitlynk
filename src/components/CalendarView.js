import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';

const CalendarView = () => {
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    const date = day.dateString;
    const existing = markedDates[date];

    // Toggle logic or plan logic
    const updatedMarks = {
      ...markedDates,
      [date]: {
        selected: true,
        selectedColor: existing?.selectedColor === 'green' ? 'red' : 'green',
      },
    };

    setMarkedDates(updatedMarks);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [today]: {
            ...(markedDates[today] || {}),
            customStyles: {
              container: {
                borderColor: 'blue',
                borderWidth: 1,
                borderRadius: 20,
              },
            },
          },
        }}
        markingType={'custom'}
      />
    </View>
  );
};

export default CalendarView;
