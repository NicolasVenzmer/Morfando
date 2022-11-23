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
  400: 'Usuario inactivo. Chequee su casilla de mail',
  404: 'Usuario no encontrado con ese correo o contraseña.',
};

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [esDueño, setEsDueño] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [usersFromBack, setUsersFromBackEnd] = useState([]);
  const [visible, setVisible] = useState(false);

  const SSOGoogle = async googleUser => {
    setIsLoading(true);

    //Verifico si existe el email en la base de datos
    //console.log(googleUser.user.name);
    // const data = {
    //   usuario: {
    //     id: 1,
    //     correo: googleUser.user.email,
    //     contrasenia: '123',
    //     nombre: googleUser.user.name,
    //     duenio: false,
    //     activo: true,
    //     createdAt: '2022-11-15T20:00:15.000Z',
    //     updatedAt: '2022-11-21T19:25:04.000Z',
    //   },
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJuaWNvdmVuekBob3RtYWlsLmNvbSIsImlhdCI6MTY2OTIyMDQ0OCwiZXhwIjoxNjY5MjI0MDQ4fQ.hcSsiBWw5GEDAFEq81pxqVsNq1WsGV-Onpu1UxkTZ1A',
    // };
    // setUserInfo(data.usuario);
    // setUserToken(data.token);
    const id = googleUser.user.id;
    //const exists = await checkUserExists(id);
    checkUserExists()

    // if (exists) {
    //   login(username, password);
    // } else {
    //   //una vez creado el usuario tengo que llamar al login para que se loggee
    //   //createUser(googleUser);
    // }

    //Ejemplo de data para hacer el login a enviar
    // const userData = {
    //   mail: googleUser.user.email,
    //   password: '123',
    // };
    //Ejemplo de lo que hay que setear en el setUserInfo
    // {
    // "usuario": {
    //     "id": 2,
    //     "correo": "nicovenz@hotmail.com",
    //     "contrasenia": "123",
    //     "nombre": "Nicolas Venzmer",
    //     "duenio": true,
    //     "activo": true,
    //     "createdAt": "2022-11-15T20:00:15.000Z",
    //     "updatedAt": "2022-11-21T19:25:04.000Z"
    // },
    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJuaWNvdmVuekBob3RtYWlsLmNvbSIsImlhdCI6MTY2OTIyMDQ0OCwiZXhwIjoxNjY5MjI0MDQ4fQ.hcSsiBWw5GEDAFEq81pxqVsNq1WsGV-Onpu1UxkTZ1A"

    //}
    setIsLoading(false);
  };

  const checkUserExists = async () => {
    // const GET_USER_URL = `/user${id}`;
    // axios
    //   .get(GET_USER_URL)
    //   .then(res => {
    //     console.log("estoy aca", res.data);
    //     //si existe seteo el usuario en setUserInfo
    //     //setUserInfo(res.data)
    //     //si no existe hago un return que no existe
    //     //return res.data;
    //   })
    //   .catch(e => {
    //     console.log(`Users GET error ${e}`);
    //   });
    const GET_USERS_URL = `/users`;
    console.log("entre al exists")
    axios
      .get(GET_USERS_URL)
      .then(res => {
        console.log('estoy aca', res.data);
        //si existe seteo el usuario en setUserInfo
        //setUserInfo(res.data)
        //si no existe hago un return que no existe
        //return res.data;
      })
      .catch(e => {
        console.log(`Users GET error ${e}`);
      });
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
        console.log(res.data);
        //si existe seteo el usuario en setUserInfo
        //si no existe hago un return que no existe
        //setUsersFromBackEnd(res.data);
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
        console.log(res.data);
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

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setEsDueño(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.clear();
    const signOut = async () => {
      try {
        await GoogleSignin.signOut();
        //this.setState({user: null}); // Remember to remove the user from your app's state as well
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
        //console.log(userInfo.duenio)
        if (!userInfo.duenio) {
          setVisible(true);
        }
        //console.log('isLoggedIn: ', userInfo);
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
