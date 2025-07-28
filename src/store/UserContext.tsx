import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = {
  name: string;
  email: string;
  phone: string;
  gender: string;
};

type UserContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const defaultUser: UserType = {
  name: '',
  email: '',
  phone: '',
  gender: '',
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserType>(defaultUser);

  const setUser = async (user: UserType) => {
    setUserState(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const loadUser = async () => {
    const stored = await AsyncStorage.getItem('user');
    if (stored) {
      setUserState(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
