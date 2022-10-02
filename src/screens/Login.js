import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
// import variables from '../config/variables';
// import axios from 'axios';
// import config from "../config/default.json"

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const isEmpty = stringToValidate => {
  if (stringToValidate !== undefined && stringToValidate !== null) {
    return stringToValidate.length === 0;
  }

  return true;
};

const Login = ({navigation}) => {
  const netInfo = useNetInfo();
  const [mail, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [noWifi, setNoWifi] = React.useState(false);
  //   const [loading, setLoading] = useState(false);

  const handleisEmpty = () => {
    if (!validateEmail(mail) || isEmpty(password)) {
      setVisible(true);
    } else {
      if (netInfo.type !== 'wifi') {
        {
          Login();
        }
      } else {
        setNoWifi(true);
      }
    }
  };

  // aca verifico si esta conectado a wifi o no
  //HAY QUE CAMBIAR EL IF A ===
  const wifi = () => {
    if (netInfo.type !== 'wifi') {
      {
        Login();
      }
    } else {
      setNoWifi(true);
    }
  };

  // const {login} = useContext(UserContext);

  // const baseUrl = config.baseUrl;

  // const Login = async () => {
  //   const setup = {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   };
  //   const body = JSON.stringify({mail, password});

  //   try {
  //     setLoading(true);
  //     axios
  //       .post(`${baseUrl}/login`, body, setup)
  //       .then(function (res) {
  //         if (res.status === 201) {
  //           setLoading(false);
  //           variables.setUsuario(res.data.data[0].idUsuario);
  //           variables.setNick(res.data.data[0].nickname);
  //           variables.setMail(res.data.data[0].mail);
  //           variables.setNombre(res.data.data[0].nombre);
  //           variables.setAvatar(res.data.data[0].avatar);
  //           //navigation.navigate('Principal');
  //           //navigation.navigate('Home');
  //           login(mail);
  //           storeLoginData(res.data.data[0]);
  //         }
  //         if (res.status === 202 || res.status === 203) {
  //           setLoading(false);
  //           setVisible(true);
  //           //alert("Invalid username or password")
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error.msg);
  //     alert(error.msg);
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ff0000',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          width: '100%',
          height: 250,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('../assets/logo_icon.png')} />
        <Text
          style={{
            position: 'absolute',
            color: 'black',
            bottom: 10,
            left: 70,
            fontWeight: '400',
          }}>
          Ingresar
        </Text>
        <View
          style={{
            backgroundColor: '#E14852',
            width: 90,
            height: 2,
            position: 'absolute',
            bottom: 0,
            left: 50,
          }}
        />
        <Pressable
          style={{
            position: 'absolute',
            bottom: 10,
            right: 70,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              color: 'black',
              fontWeight: '400',
            }}>
            Registrarse
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '80%',
          height: 50,
          top: 20,
          borderRadius: 10,
        }}>
        <Image
          style={{
            alignSelf: 'flex-start',
            alignSelf: 'center',
            left: 10,
            width: 25,
            height: 25,
          }}
          source={require('../assets/Icons/google_icon.png')}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            left: 20,
          }}>
          Ingresar con Google
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '80%',
          height: 150,
        }}>
        <TextInput
          style={{
            width: '90%',
            height: 40,
            margin: 5,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            padding: 10,
          }}
          onChangeText={setUsuario}
          value={mail}
          placeholder="Email"
        />
        <TextInput
          style={{
            width: '90%',
            height: 40,
            margin: 5,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            padding: 10,
          }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
      </View>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            El mail o contraseña son invalidos.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}></View>
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
              width: '40%',
              alignSelf: 'center',
              borderRadius: 5,
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('Login');
              setVisible(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

      <ModalPoup visible={noWifi}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            No se encuentra conectado a una red Wifi. ¿Desea continuar usando
            sus datos?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}></View>
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
              width: '40%',
              alignSelf: 'center',
              borderRadius: 5,
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('Login');
              setNoWifi(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={{
              width: '40%',
              alignSelf: 'center',
              borderRadius: 5,
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate('MisRestaurantes')}
            // onPress={() => {
            //   {
            //     Login();
            //   }
            //   setNoWifi(false);
            // }}
          >
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

      <Pressable
        style={{
          width: '78%',
          height: 20,
          position: 'absolute',
          top: 440,
        }}
        onPress={() => navigation.navigate('OlvideMiContraseña')}>
        <Text style={{color: '#E14852', fontStyle: 'italic'}}>
          Olvidaste tu contraseña?
        </Text>
      </Pressable>
      <Pressable
        style={{
          position: 'absolute',
          width: '80%',
          top: 500,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
        // onPress={() => navigation.navigate('MisRestaurantes')}
        onPress={() => setNoWifi(handleisEmpty)}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Ingresar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#F7F4F4',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalContainer2: {
    width: '80%',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default Login;
