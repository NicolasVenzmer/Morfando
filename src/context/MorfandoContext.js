import React from 'react';
// @function  UserContext
export const UserContext = React.createContext({name: '', auth: false});
import AsyncStorage from '@react-native-async-storage/async-storage';
// @function  UserProvider
// Create function to provide UserContext
export const UserProvider = ({children}) => {
  const [user, setUser] = React.useState({name: '', auth: false});
  const [name, setName] = React.useState('');

  const login = name => {
    setUser(user => ({
      name: name,
      auth: true,
    }));
  };

  const logout = () => {
    setUser(user => ({
      name: '',
      auth: false,
    }));
    clearAll();
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done, clear storage');
  };

  const data = {user, login, logout, isAuthenticated: user?.auth};
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
