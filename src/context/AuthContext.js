import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import axios from '../api/axios';
const LOGIN_URL = '/user/:mail/:password';

export const AuthContext = createContext();

export const ErrorReference = {
  500: 'Error de servidor',
  400: 'Bad Request',
  404: 'Usuario no encontrado con ese correo o contraseña.',
};

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [esDueño, setEsDueño] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    setIsLoading(true);

    const mail = username;
    axios
      .post(LOGIN_URL, {
        mail,
        password,
      })
      .then(res => {
        //Resultado de aceptacion
        if (res.status > 299) {
          setError(ErrorReference[res.status]);
          return;
        }
        let userData = res.data;
        setUserInfo(userData.usuario);
        setUserToken(userData.token);

        // ACA ME FIJO SI EL DUEÑO O NO
        if (userData.usuario.duenio) {
          setEsDueño(true);
        }
        console.log('DATA: ', JSON.stringify(userData.usuario.activo));
        AsyncStorage.setItem('userInfo', JSON.stringify(userData.usuario));
        AsyncStorage.setItem('userToken', userData.token);
      })
      .catch(e => {
        setError(ErrorReference[404]);
        console.log("error: ", error[404])
        console.log(`Login error ${e}`);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setEsDueño(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.clear();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = AsyncStorage.getItem('userInfo');
      let userToken = AsyncStorage.getItem('userToken');

      if (userInfo) {
        console.log('isLoggedIn: ', userInfo);
        setUserToken(userToken);
        setUserInfo(userInfo);
      } else {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    //isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo, esDueño, error}}>
      {children}
    </AuthContext.Provider>
  );
};
