import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { account } from './src/services/appwrite';
import { ThemeProvider } from './src/store/ThemeContext';
import { UserProvider } from './src/store/UserContext'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'MainApp'>('Login');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        const user = await account.get();
        console.log('User:', user); 
        setInitialRoute('MainApp');
      } catch {
        setInitialRoute('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading) return null;

  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator initialRouteName={initialRoute} />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
