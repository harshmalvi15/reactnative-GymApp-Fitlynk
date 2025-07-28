import { useUser } from '../store/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { useTheme } from '../store/ThemeContext';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const { colors } = theme;

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [notifyLowCrowd, setNotifyLowCrowd] = useState(false);
  const [weekWorkoutDays, setWeekWorkoutDays] = useState(0);
  const [weekWorkoutDates, setWeekWorkoutDates] = useState<string[]>([]);
  const [todayBodyParts, setTodayBodyParts] = useState<string[]>([]);
  const [targetDays, setTargetDays] = useState(5);


  // Load today's workout parts on focus
  useFocusEffect(
    React.useCallback(() => {
      const loadTodayWorkout = async () => {
        const today = dayjs().format('YYYY-MM-DD');
        const data = await AsyncStorage.getItem(`workoutParts-${today}`);
        if (data) {
          setTodayBodyParts(JSON.parse(data));
        } else {
          setTodayBodyParts([]); // clear if nothing
        }
      };

      loadTodayWorkout();
    }, [])
  );

  useFocusEffect(
  React.useCallback(() => {
    const loadThisWeekWorkouts = async () => {
      const data = await AsyncStorage.getItem('workoutDays');
      if (!data) {
        setWeekWorkoutDays(0);
        setWeekWorkoutDates([]);
        return;
      }

      const marked: MarkedDates = JSON.parse(data);
      const thisWeekStart = dayjs().startOf('isoWeek');
      const thisWeekEnd = dayjs().endOf('isoWeek');

      const workoutDates: string[] = [];

      const count = Object.keys(marked).filter((date) => {
        const d = dayjs(date);
        const bgColor =
          (marked[date]?.customStyles?.container as { backgroundColor?: string })?.backgroundColor;

        const isWorkoutDay = bgColor === '#00FF7F';
        const isThisWeek = d.isAfter(thisWeekStart.subtract(1, 'day')) && d.isBefore(thisWeekEnd.add(1, 'day'));

        if (isWorkoutDay && isThisWeek) {
          workoutDates.push(d.format('ddd'));
          return true;
        }
        return false;
      }).length;

      setWeekWorkoutDays(count);
      setWeekWorkoutDates(workoutDates);
    };
    const loadTarget = async () => {
  const stored = await AsyncStorage.getItem('targetWorkoutDays');
  if (stored) setTargetDays(Number(stored));
};
    loadTarget();


    loadThisWeekWorkouts();
  }, [])
);


  const motivationQuotes = [
    "Push yourself, because no one else is going to do it for you.",
    "No pain, no gain!",
    "You don’t have to be extreme, just consistent.",
    "Excuses don’t burn calories.",
    "It’s a slow process, but quitting won’t speed it up.",
    "Your body can stand almost anything. It’s your mind you have to convince.",
    "Success starts with self-discipline.",
    "What seems impossible today will one day become your warm-up.",
    "The hardest lift of all is lifting your butt off the couch.",
    "Be stronger than your excuses.",
  ];

  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString());
    };

    const loadDailyQuote = async () => {
      const today = new Date().toISOString().split('T')[0];
      const stored = await AsyncStorage.getItem('dailyQuote');

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          setMotivationalQuote(parsed.quote);
          return;
        }
      }

      const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
      const newQuote = motivationQuotes[randomIndex];
      setMotivationalQuote(newQuote);

      await AsyncStorage.setItem(
        'dailyQuote',
        JSON.stringify({ date: today, quote: newQuote })
      );
    };

    updateTime();
    loadDailyQuote();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.greetingContainer}>
        <Text style={[styles.greetingText, { color: colors.primary }]}>Hello, {user?.name || 'Guest'}</Text>

        <Text style={[styles.timeText, { color: colors.text }]}>{time}</Text>
        <Text style={[styles.dateText, { color: colors.secondary }]}>{date}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Today's Motivation</Text>
        <Text style={[styles.motivationText, { color: colors.text }]}>
          {motivationalQuote}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Active Plan</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>Plan: Pro Membership</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          Crowd Meter: <Text style={{ color: 'green' }}>Low</Text>
        </Text>
        <View style={styles.notifyContainer}>
          <Text style={[styles.cardText, { color: colors.text }]}>Notify me on low crowd</Text>
          <Switch value={notifyLowCrowd} onValueChange={setNotifyLowCrowd} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>📆 This Week's Goal</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>Workout Days Target: {targetDays}</Text>

        <Text style={[styles.cardText, { color: colors.text }]}>
          Days Completed: <Text style={{ fontWeight: '600' }}>{weekWorkoutDays}</Text>
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          Attendance: <Text style={{ fontWeight: '600' }}>
            {weekWorkoutDays === 0 ? 'None yet' : weekWorkoutDates.join(', ')}
          </Text>
        </Text>
      </View>

      {/* 🧠 Today's Focus Card Always Visible */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>🧠 Today's Workout Focus</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {todayBodyParts.length > 0 ? todayBodyParts.join(' & ') : 'No workout selected'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  greetingContainer: {
    padding: 10,
    marginVertical: 40,
  },
  greetingText: {
    fontSize: 35,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  motivationText: {
    fontSize: 16,
  },
  notifyContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
});

export default HomeScreen;
