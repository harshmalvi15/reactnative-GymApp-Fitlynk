import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../store/ThemeContext';

const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'];

export default function PaymentMethodScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const route = useRoute();
  const { amount, planName, planColor } = route.params as {
    amount: number;
    planName: string;
    planColor: string;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.primary }]}>Choose Payment Method</Text>

      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.methodButton,
            {
              backgroundColor:
                selectedMethod === method ? planColor : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setSelectedMethod(method)}
        >
          <Text style={{ color: colors.text }}>{method}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={[styles.amountText, { color: colors.text }]}>
          To Pay: ₹{amount}
        </Text>
        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: selectedMethod ? planColor : '#ccc' }]}
          disabled={!selectedMethod}
        >
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginVertical:30
  },
  methodButton: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    marginBottom: 12,
  },
  payButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  payText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});
