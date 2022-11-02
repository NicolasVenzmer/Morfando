import React, {useState, useContext, useEffect} from 'react';
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
import {AuthContext, ErrorReference} from '../context/AuthContext';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
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
  const {login, error} = useContext(AuthContext);

  const netInfo = useNetInfo();
  const [mail, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [noWifi, setNoWifi] = useState(false);

  const handleisEmpty = () => {
    if (!validateEmail(mail) || isEmpty(password)) {
      setVisible(true);
    } else {
      if (netInfo.type === 'wifi') {
        {
          login(mail, password);
        }
      } else {
        setNoWifi(true);
      }
    }
  };

  // aca verifico si esta conectado a wifi o no
  // const wifi = () => {
  //   if (netInfo.type === 'wifi') {
  //     {
  //       login(mail, password);
  //     }
  //   } else {
  //     setNoWifi(true);
  //   }
  // };

  useEffect(() => {
    if(error === ErrorReference[404]){
      console.log(ErrorReference[404]);
      setVisible(true)
    }
  } ,[error])

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '50%',
          borderRadius: 30,
        }}>
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
            onChangeText={text => setUsuario(text)}
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
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Contraseña"
          />
        </View>

        <ModalPoup visible={visible}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontSize: 20, color: 'black'}}>
              {ErrorReference[404]}
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
                alignSelf: 'center',
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
              <Text style={{color: 'white', textAlign: 'center'}}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={{
                alignSelf: 'center',
                width: '50%',
                marginVertical: 10,
                paddingVertical: 10,
                backgroundColor: '#E14852',
                borderRadius: 30,
              }}
              onPress={() => {
                {
                  login(mail, password);
                }
                setNoWifi(false);
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
            </Pressable>
          </View>
        </ModalPoup>

        <Pressable
          style={{
            width: '78%',
            height: 20,
          }}
          onPress={() => navigation.navigate('OlvideMiContraseña')}>
          <Text style={{color: '#E14852', fontStyle: 'italic'}}>
            Olvidaste tu contraseña?
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          marginTop: 10,
          marginBottom: 10,
          position: 'absolute',
          width: '80%',
          bottom: 0,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
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
