import { useUser } from '../store/UserContext';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { ID, account } from '../services/appwrite';
import { useTheme } from '../store/ThemeContext';

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { colors } = theme;

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const { setUser } = useUser();

  const handleRegister = async () => {
    try {
      const userId = ID.unique();
      await account.create(userId, email, password, username);
      Alert.alert('Success', 'Registration successful!');
      setUser({
        name: username,
        email,
        phone,
        gender,
      });
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor:  colors.background }]}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.primary }]}>FitLynk</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor={colors.secondary}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={username}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.secondary}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={colors.secondary}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.secondary}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={[styles.label, { color: colors.secondary }]}>Gender</Text>
      <View style={styles.radioGroup}>
        {['Male', 'Female', 'Other'].map((g) => (
          <TouchableOpacity key={g} onPress={() => setGender(g as any)}>
            <Text
              style={[
                styles.radio,
                { color: gender === g ? colors.primary : colors.secondary },
                gender === g && styles.radioSelected,
              ]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleRegister}
      >
        <Text style={[styles.buttonText, { color: '#000' }]}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: colors.primary }]}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radio: {
    padding: 8,
  },
  radioSelected: {
    fontWeight: 'bold',
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
  },
});
