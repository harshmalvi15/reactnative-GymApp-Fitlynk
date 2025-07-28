// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import PaymentMethodScreen from '../screens/PaymentScreen';
import GymDetailScreen from '../screens/GymDetailScreen';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MainApp: undefined;
  PaymentMethod: {
    amount: number;
    planName: string;
    planColor: string;
  };
GymDetail: {
  name: string;
  logo: any;
  rating: number;
  price: number;
  distance: number;
  crowd: string;
  plan: number;
  images: any[];
};

  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  initialRouteName: keyof RootStackParamList;
};

export default function StackNavigator({ initialRouteName }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={BottomTabs} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="GymDetail" component={GymDetailScreen} />


    </Stack.Navigator>
  );
}
