import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import axios from "../api/axios"
const LOGIN_URL = '/user/';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [esDueño, setEsDueño] = useState(true)
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);

    const mail = username;
    axios
      .get(LOGIN_URL, {
        mail,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        //setUserToken(userInfo.token);

        // ACA ME FIJO SI EL DUEÑO O NO
        // if(userInfo.duenio){
        //   setEsDueño(true);
        // }

        //AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        //AsyncStorage.setItem('userToken', userInfo.token);

        console.log("User Data: ", res.data);
        //console.log('User Token: ' + userInfo.token);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
      });
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
      //setUserToken(null)
      //console.log('userInfo', userInfo);

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
    <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, esDueño}}>
      {children}
    </AuthContext.Provider>
  );
};
