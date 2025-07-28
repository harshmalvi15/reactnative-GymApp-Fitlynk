import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../store/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type DurationType = 'Monthly' | 'Half-Yearly' | 'Yearly';

const PlansScreen = () => {
  const [selectedDuration, setSelectedDuration] = useState<DurationType>('Monthly');
  const { theme } = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const durations: DurationType[] = ['Monthly', 'Half-Yearly', 'Yearly'];

  const plans = [
    {
      name: 'Regular Plan',
      color: '#00FFD1',
      prices: {
        Monthly: 999,
        'Half-Yearly': 4999,
        Yearly: 8999,
      },
      features: ['Gym Access', 'Locker Facility', '1 Trainer Session per week'],
    },
    {
      name: 'Pro Plan',
      color: '#00BFFF',
      prices: {
        Monthly: 1599,
        'Half-Yearly': 7999,
        Yearly: 13999,
      },
      features: ['Gym + Cardio Access', 'Locker', 'Diet Plan', '3 Trainer Sessions per week'],
    },
    {
      name: 'Premium Plan',
      color: '#FF69B4',
      prices: {
        Monthly: 2599,
        'Half-Yearly': 11999,
        Yearly: 19999,
      },
      features: [
        'All Access',
        'Personal Locker',
        'Unlimited Trainer Sessions',
        'Diet + Supplements',
        'Sauna & Steam',
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Membership Plans</Text>

      <View style={styles.durationSelector}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              { borderColor: colors.border },
              selectedDuration === duration && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text
              style={[
                styles.durationText,
                { color: selectedDuration === duration ? colors.background : colors.secondary },
                selectedDuration === duration && { fontWeight: 'bold' },
              ]}
            >
              {duration}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {plans.map((plan) => (
          <View
            key={plan.name}
            style={[
              styles.planCard,
              { borderColor: plan.color, backgroundColor: colors.card },
            ]}
          >
            <View style={styles.headerRow}>
              <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
              <TouchableOpacity
                style={[styles.payNowButton, { backgroundColor: plan.color }]}
                onPress={() =>
                  navigation.navigate('PaymentMethod', {
                    planName: plan.name,
                    amount: plan.prices[selectedDuration],
                    planColor: plan.color,
                  })
                }
              >
                <Text style={[styles.payNowText, { color: '#000' }]}>Pay Now</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.planPrice, { color: colors.text }]}>
              ₹{plan.prices[selectedDuration]}
            </Text>
            <View style={styles.featuresList}>
              {plan.features.map((feature, index) => (
                <Text key={index} style={[styles.featureText, { color: colors.secondary }]}>
                  • {feature}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    marginVertical: 30,
  },
  durationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
  },
  planCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 18,
    marginVertical: 10,
  },
  featuresList: {
    marginTop: 8,
  },
  featureText: {
    fontSize: 14,
    marginVertical: 2,
  },
  payNowButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  payNowText: {
    fontWeight: '600',
  },
});
