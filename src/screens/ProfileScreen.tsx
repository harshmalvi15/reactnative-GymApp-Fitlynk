import { useUser } from '../store/UserContext';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { account } from '../services/appwrite';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useTheme } from '../store/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, isDark, toggleTheme } = useTheme();
  const { colors } = theme;
  const { user } = useUser();

  const [workoutCount, setWorkoutCount] = useState(0);
  const [restCount, setRestCount] = useState(0);

  useEffect(() => {
    const loadAttendance = async () => {
      const data = await AsyncStorage.getItem('workoutDays');
      if (!data) return;

      const marked = JSON.parse(data);
      const currentMonth = dayjs().month();
      const currentYear = dayjs().year();

      let workout = 0;
      let rest = 0;

      for (const date in marked) {
        const day = dayjs(date);
        if (day.month() === currentMonth && day.year() === currentYear) {
          const bg =
            (marked[date]?.customStyles?.container as { backgroundColor?: string })?.backgroundColor;

          if (bg === '#00FF7F') workout++;
          else if (bg === '#FF6B6B') rest++;
        }
      }

      setWorkoutCount(workout);
      setRestCount(rest);
    };

    const unsubscribe = navigation.addListener('focus', loadAttendance);
    loadAttendance();

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/placeholder.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'Name'}</Text>
          <Text style={[styles.email, { color: colors.secondary }]}>{user?.email || 'email@example.com'}</Text>
        </View>
      </View>

      {/* Attendance Summary */}
      <View style={[styles.box, { backgroundColor: colors.card }]}>
        <Text style={[styles.attendanceTitle, { color: colors.text }]}>This Month’s Attendance</Text>
        <View style={styles.attendanceStats}>
          <Text style={[styles.attended, { color: colors.primary }]}>{workoutCount} Days Attended</Text>
          <Text style={[styles.rest, { color: '#f87171' }]}>{restCount} Rest Days</Text>
        </View>
      </View>

      {/* Active Membership */}
      <View style={[styles.box, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Membership</Text>
        <Text style={[styles.membershipPlan, { color: colors.primary }]}>Pro Plan - ₹1599/month</Text>
        <Text style={[styles.planStatus, { color: colors.secondary }]}>Valid till: 30 June 2025</Text>
      </View>

      {/* Theme Toggle */}
      <View style={styles.toggleRow}>
        <Text style={[styles.menuText, { color: colors.text }]}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? '#00FFD1' : '#ccc'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Menu Options */}
      <View style={[styles.menu]}>
        <MenuItem icon="create-outline" label="Edit Profile" />
        <MenuItem icon="card-outline" label="Payment History" />
        <MenuItem icon="settings-outline" label="Settings & Preferences" />
        <MenuItem icon="chatbubble-ellipses-outline" label="Support & Help" />
        <MenuItem icon="log-out-outline" label="Logout" isLogout onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

type MenuItemProps = {
  icon: string;
  label: string;
  isLogout?: boolean;
  onPress?: () => void;
};

const MenuItem = ({ icon, label, isLogout = false, onPress }: MenuItemProps) => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.menuItem,
        isLogout && { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 20 },
      ]}
      activeOpacity={0.7}
    >
      <Icon
        name={icon}
        size={22}
        color={isLogout ? '#f87171' : colors.primary}
        style={{ marginRight: 12 }}
      />
      <Text style={[styles.menuText, { color: isLogout ? '#f87171' : colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginVertical:20
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
  box: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
  },
  attendanceTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attended: {
    fontWeight: 'bold',
  },
  rest: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  membershipPlan: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planStatus: {
    fontSize: 13,
    marginTop: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  menu: {
    gap: 20,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
  },
});
