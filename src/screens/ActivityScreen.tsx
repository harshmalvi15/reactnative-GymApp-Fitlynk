import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useTheme } from '../store/ThemeContext';

const exercises = {
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Push Ups', 'Chest Fly', 'Cable Crossover'],
  Legs: ['Squats', 'Leg Press', 'Lunges', 'Leg Extension', 'Calf Raise'],
  Arms: ['Bicep Curl', 'Tricep Dips', 'Hammer Curl', 'Preacher Curl', 'Skull Crusher'],
  Abs: ['Crunches', 'Plank', 'Leg Raises', 'Russian Twist', 'Bicycle Crunch'],
  Shoulders: ['Shoulder Press', 'Lateral Raise', 'Front Raise', 'Shrugs', 'Reverse Fly'],
  Back: ['Deadlift', 'Lat Pulldown', 'Seated Row', 'Pull Ups', 'T-Bar Row'],
};

type MarkedDates = {
  [key: string]: {
    customStyles: {
      container?: object;
      text?: object;
    };
  };
};

const ActivityScreen = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [targetDays, setTargetDays] = useState<number>(5);
  const [targetModalVisible, setTargetModalVisible] = useState(false);


  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    const loadWorkoutDays = async () => {
      const data = await AsyncStorage.getItem('workoutDays');
      if (data) {
        setMarkedDates(JSON.parse(data));
      }
    };
    loadWorkoutDays();
  }, []);


  useEffect(() => {
  const loadTargetDays = async () => {
    const stored = await AsyncStorage.getItem('targetWorkoutDays');
    if (stored) setTargetDays(Number(stored));
  };
  loadTargetDays();
}, []);


  useEffect(() => {
    if (modalVisible) {
      const loadTodayWorkoutParts = async () => {
        const today = dayjs().format('YYYY-MM-DD');
        const data = await AsyncStorage.getItem(`workoutParts-${today}`);
        if (data) {
          const parts = JSON.parse(data);
          setSelectedBodyParts(parts);
          const allExercises = parts.flatMap(
            (part: string) => exercises[part as keyof typeof exercises]
          );
          setSelectedExercises(allExercises);
        } else {
          setSelectedBodyParts([]);
          setSelectedExercises([]);
        }
      };
      loadTodayWorkoutParts();
    }
  }, [modalVisible]);

  const toggleWorkoutDay = async (date: string) => {
    setMarkedDates(prev => {
      const updated = { ...prev };
      const currentBg = (updated[date]?.customStyles?.container as { backgroundColor?: string })?.backgroundColor;

      if (currentBg === '#00FF7F') {
        updated[date] = {
          customStyles: {
            container: { backgroundColor: '#FF6B6B', borderRadius: 20 },
            text: { color: colors.text },
          },
        };
      } else {
        updated[date] = {
          customStyles: {
            container: { backgroundColor: '#00FF7F', borderRadius: 20 },
            text: { color: colors.text },
          },
        };
      }

      AsyncStorage.setItem('workoutDays', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBodyPart = (part: string) => {
    if (selectedBodyParts.includes(part)) {
      setSelectedBodyParts(prev => prev.filter(p => p !== part));
      setSelectedExercises(prev =>
        prev.filter(e => !exercises[part as keyof typeof exercises].includes(e))
      );
    } else {
      setSelectedBodyParts(prev => [...prev, part]);
    }
  };

  const toggleExercise = (exercise: string) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(prev => prev.filter(e => e !== exercise));
    } else {
      setSelectedExercises(prev => [...prev, exercise]);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Workout Calendar</Text>

      <Calendar
        key={theme.dark ? 'dark' : 'light'}
        onDayPress={(day: DateData) => toggleWorkoutDay(day.dateString)}
        markingType="custom"
        markedDates={{
          [today]: {
            customStyles: {
              container: {
                borderWidth: 2,
                borderColor: colors.primary,
                borderRadius: 10,
              },
              text: {
                color: colors.text,
              },
            },
          },
          ...markedDates,
        }}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.card,
          textSectionTitleColor: colors.text,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: '#fff',
          todayTextColor: theme.dark ? '#00FF7F' : '#007AFF',
          dayTextColor: colors.text,
          textDisabledColor: colors.border,
          monthTextColor: colors.text,
          arrowColor: colors.primary,
          dotColor: colors.primary,
        }}
        hideExtraDays={false}
        disableAllTouchEventsForDisabledDays={true}
      />
      <Modal visible={targetModalVisible} animationType="slide" transparent>
  <View style={[styles.modalOverlay]}>
    <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
      <Text style={[styles.modalTitle, { color: colors.text }]}>🎯 Set Weekly Target</Text>
      <View style={styles.dayButtons}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.button,
              {
                backgroundColor: targetDays === day ? colors.primary : colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setTargetDays(day)}
          >
            <Text style={{ color: colors.text }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={async () => {
          await AsyncStorage.setItem('targetWorkoutDays', targetDays.toString());
          setTargetModalVisible(false);
        }}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>Save</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
      <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={() => setTargetModalVisible(true)}>
        <Text style={[styles.buttonText, { color: colors.background }]}>🎯 Set Target Days</Text>
        </TouchableOpacity>



      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setModalVisible(true)}>
        <Text style={[styles.buttonText, { color: colors.background }]}>Set Workout</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Today's Workout</Text>
      {selectedExercises.length > 0 ? (
        selectedExercises.map((exercise, index) => (
          <Text key={index} style={[styles.exerciseText, { color: colors.text }]}>• {exercise}</Text>
        ))
      ) : (
        <Text style={[styles.exerciseText, { color: colors.secondary }]}>No workout selected</Text>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Select Body Parts</Text>
          {Object.keys(exercises).map(part => (
            <TouchableOpacity
              key={part}
              onPress={() => toggleBodyPart(part)}
              style={[
                styles.bodyPartButton,
                { backgroundColor: selectedBodyParts.includes(part) ? colors.primary : colors.card },
              ]}
            >
              <Text style={[styles.bodyPartText, { color: colors.text }]}>{part}</Text>
            </TouchableOpacity>
          ))}

          {selectedBodyParts.map(part => (
            <View key={part}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>{part} Exercises</Text>
              {exercises[part as keyof typeof exercises].map((ex, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleExercise(ex)}
                  style={[
                    styles.exerciseOption,
                    { backgroundColor: selectedExercises.includes(ex) ? colors.primary : colors.card },
                  ]}
                >
                  <Text style={[styles.exerciseOptionText, { color: colors.text }]}>{ex}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={[styles.button, { marginVertical: 20, backgroundColor: colors.primary }]}
            onPress={async () => {
              const today = dayjs().format('YYYY-MM-DD');
              await AsyncStorage.setItem(`workoutParts-${today}`, JSON.stringify(selectedBodyParts));
              setModalVisible(false);
            }}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical:0
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40,
    marginBottom:12
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseText: {
    fontSize: 16,
    marginVertical: 4,
  },
  modalContainer: {
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bodyPartButton: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
  bodyPartText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  exerciseOption: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
  },
  exerciseOptionText: {
    fontSize: 16,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalBox: {
  width: '80%',
  padding: 20,
  borderRadius: 10,
},
dayButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 20,
},
dayButton: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  borderWidth: 1,
},

});

export default ActivityScreen;
