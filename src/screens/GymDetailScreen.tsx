import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useTheme } from '../store/ThemeContext';

type GymDetailRouteProp = RouteProp<RootStackParamList, 'GymDetail'>;

const GymDetailScreen = () => {
  const route = useRoute<GymDetailRouteProp>();
  const { colors } = useTheme().theme;

  const { name, logo, rating, price, distance, crowd, plan, images } = route.params;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>{name}</Text>
      <Image source={logo} style={styles.logo} />

      <View style={styles.info}>
        <Text style={[styles.text, { color: colors.text }]}>⭐ Rating: {rating}</Text>
        <Text style={[styles.text, { color: colors.text }]}>💰 Price: ₹{price} per day</Text>
        <Text style={[styles.text, { color: colors.text }]}>📍 Distance: {distance} km</Text>
        <Text style={[styles.text, { color: colors.text }]}>👥 Crowd Level: {crowd}</Text>
        <Text style={[styles.text, { color: colors.text }]}>📦 Plan starts at ₹{plan}/month</Text>
      </View>

      {/* Extra Info (Static for now) */}
      <View style={styles.extraInfo}>
        <Text style={[styles.extraText, { color: colors.text }]}>🕒 Timings: 5:00 AM - 10:00 PM</Text>
        <Text style={[styles.extraText, { color: colors.text }]}>📞 Contact: +91-9876543210</Text>
        <Text style={[styles.extraText, { color: colors.text }]}>📫 Address: 123, Main Street, FitCity</Text>
        <Text style={[styles.extraText, { color: colors.text }]}>🏋️ Facilities: Cardio, Weights, Trainers, Sauna</Text>
      </View>

      <Text style={[styles.galleryTitle, { color: colors.text }]}>📸 Gallery</Text>
      <View style={styles.gallery}>
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.galleryImage} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 12,
    marginVertical:40
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
  extraInfo: {
    marginBottom: 20,
    gap: 6,
    paddingTop: 8,
  },
  extraText: {
    fontSize: 15,
    opacity: 0.9,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gallery: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 30,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});

export default GymDetailScreen;
