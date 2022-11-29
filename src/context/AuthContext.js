import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import axios from '../api/axios';
import {View, Text, Pressable} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';

export const AuthContext = createContext();

export const ErrorReference = {
  500: 'Error de servidor',
  400: 'El usuario esta inactivo, por favor verifique su email.',
  404: 'Usuario no encontrado con ese correo o contraseña.',
};

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [esDueño, setEsDueño] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const SSOGoogle = async (googleUser,usersFromBack) => {
    const users = usersFromBack.map(user => user.correo);
    const userExists = users.includes(googleUser.user.email);
    //console.log("userExsiste", userExists)
    
    //console.log(usersFromBack);
    if (userExists) {
      const mail = googleUser.user.email;
      const password = '123';
      setIsLoading(true);
      const LOGIN_URL = '/user/:mail/:password';
      axios
        .post(LOGIN_URL, {
          mail,
          password,
        })
        .then(res => {
          //console.log(res.data);
          let userData = res.data;
          //Resultado de aceptacion
          if (res.status > 299) {
            setError(ErrorReference[res.status]);
            return;
          }
          //console.log("token", userData.token)
          setUserInfo(userData.usuario);
          setUserToken(userData.token);

          setEsDueño(false);
          //console.log('DATA: ', JSON.stringify(userData.usuario.activo));
          AsyncStorage.setItem('userInfo', JSON.stringify(userData.usuario));
          AsyncStorage.setItem('userToken', userData.token);
        })
        .catch(e => {
          setError(ErrorReference[404]);
          setError(ErrorReference[400]);
          console.log(`Login error ${e}`);
        });
      setIsLoading(false);
      //console.log('estoy en el login porque existe');
      return;
    } else {
      createUser(googleUser);
      const mail = googleUser.user.email;
      const password = '123';
      setIsLoading(true);
      const LOGIN_URL = '/user/:mail/:password';
      axios
        .post(LOGIN_URL, {
          mail,
          password,
        })
        .then(res => {
          //console.log(res.data);
          let userData = res.data;
          //Resultado de aceptacion
          if (res.status > 299) {
            setError(ErrorReference[res.status]);
            return;
          }
          //console.log("token", userData.token)
          setUserInfo(userData.usuario);
          setUserToken(userData.token);
          setEsDueño(false);
          //console.log('DATA: ', JSON.stringify(userData.usuario.activo));
          AsyncStorage.setItem('userInfo', JSON.stringify(userData.usuario));
          AsyncStorage.setItem('userToken', userData.token);
        })
        .catch(e => {
          setError(ErrorReference[404]);
          setError(ErrorReference[400]);
          console.log(`Login error ${e}`);
        });
      setIsLoading(false);
      //console.log('estoy en el create porque no existe');
    }
  };

  const createUser = async googleUser => {
    const CREATE_USER_URL = `/user`;
    const sendData = {
      nombre: googleUser.user.name,
      correo: googleUser.user.email,
      contrasenia: '123',
      imagen: googleUser.user.photo,
      duenio: false,
      activo: true,
    };
    axios
      .post(CREATE_USER_URL, sendData)
      .then(res => {
        return;
      })
      .catch(e => {
        console.log(`Create POST error ${e}`);
      });
  };

  const login = async (username, password) => {
    setIsLoading(true);
    const mail = username;
    const LOGIN_URL = '/user/:mail/:password';
    axios
      .post(LOGIN_URL, {
        mail,
        password,
      })
      .then(res => {
        //console.log(res.data);
        let userData = res.data;
        //Resultado de aceptacion
        if (res.status > 299) {
          setError(ErrorReference[res.status]);
          return;
        }
        // ACA ME FIJO SI EL DUEÑO O NO
        if (!userData.usuario.duenio) {
          setVisible(true);
        } else {
          //console.log("token", userData.token)
          setUserInfo(userData.usuario);
          setUserToken(userData.token);

          setEsDueño(true);
          //console.log('DATA: ', JSON.stringify(userData.usuario.activo));
          AsyncStorage.setItem('userInfo', JSON.stringify(userData.usuario));
          AsyncStorage.setItem('userToken', userData.token);
        }
      })
      .catch(e => {
        setError(ErrorReference[404]);
        setError(ErrorReference[400]);
        console.log(`Login error ${e}`);
      });
    setIsLoading(false);
  };

  const logout = async() => {
    GoogleSignin.configure({
      androidClientId:
        '763386562376-it05kregjrduu51masjd81knbhue5g7p.apps.googleusercontent.com',
      iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    setIsLoading(true);
    setUserToken(null);
    setEsDueño(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.clear();
    const signOut = async () => {
      try {
        await GoogleSignin.signOut();
        setUserToken(null);
        setEsDueño(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.clear();
      } catch (error) {
        console.error(error);
      }
    };
    signOut();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo').then(JSON.parse);
      let userToken = await AsyncStorage.getItem('userToken');

      if (userInfo) {
        // ACA ME FIJO SI EL DUEÑO O NO
        setUserToken(userToken);
        setUserInfo(userInfo);
        //console.log("isloggedin", userInfo)
        if(userInfo.duenio){
          setEsDueño(true)
        }
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
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        esDueño,
        error,
        SSOGoogle,
      }}>
      {children}
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: Theme.fonts.LARGE,
              color: Theme.colors.SECONDARY,
            }}>
            El usuario no es dueño, por favor ingrese por la pantalla de
            consumidor.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1%',
            marginBottom: '1%',
            marginHorizontal: '1%',
          }}>
          <Pressable
            style={{
              alignSelf: 'center',
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: Theme.colors.PRIMARY,
              borderRadius: 30,
            }}
            onPress={() => {
              setVisible(false);
            }}>
            <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
              Aceptar
            </Text>
          </Pressable>
        </View>
      </ModalPoup>
    </AuthContext.Provider>
  );
};
