import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/login`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', userInfo.token);

        console.log(res.data);
        console.log('User Token: ' + userInfo.token);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
      });
    // setUserToken('ioiojlkad');
    // AsyncStorage.setItem('userToken', userToken);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      //setIsLoading(true); aca estoy cambiando el loading para ver que pasa y corregir
      let userInfo = AsyncStorage.getItem('userInfo');
      let userToken = AsyncStorage.getItem('userToken');
      //userInfo = JSON.parse(userInfo);
      console.log("userINFF", userInfo)

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
