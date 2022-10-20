import React, {useState} from 'react';
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
import axios from '../api/axios';
const PASSWORD_RESET_URL = '/user-forgot-password';

const isEmpty = stringToValidate => {
  if (stringToValidate !== undefined && stringToValidate !== null) {
    return stringToValidate.length === 0;
  }

  return true;
};

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

const OlvideMiContraseña = ({navigation}) => {
  const [mail, setUsuario] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleisEmpty = mail => {
    if (!validateEmail(mail)) {
      setVisible(true);
    } else {
      resetPassword(mail);
    }
  };

  const resetPassword = async mail => {
    setIsLoading(true);
    const correo = mail
    axios
      .post(PASSWORD_RESET_URL, {
        correo
      })
      .then(res => {
        if (res.status === 200) {
          navigation.navigate('RestaurarContraseña');
        }

        console.log('data', res.status);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
      });
    setIsLoading(false);
  };

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
      <Pressable
        style={{
          alignSelf: 'flex-start',
          top: 20,
          left: 40,
        }}
        onPress={() => navigation.navigate('Login')}>
        <Image
          style={{
            width: 15,
            height: 15,
          }}
          source={require('../assets/Icons/back_icon.png')}
        />
      </Pressable>
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
            top: 35,
            maxWidth: '82%',
          }}>
          <Text style={{color: 'black'}}>
            Ingresa tu mail para recuperar tu contraseña.
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            top: 20,
            width: '80%',
            height: 150,
            borderRadius: 30,
          }}>
          <TextInput
            style={{
              width: '90%',
              height: 40,
              margin: 12,
              borderBottomColor: 'grey', // Add this to specify bottom border color
              borderBottomWidth: 1,
              padding: 10,
            }}
            onChangeText={setUsuario}
            value={mail}
            placeholder="Email"
          />
        </View>
      </View>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Por favor ingrese un mail valido.
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
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('OlvideMiContraseña');
              setVisible(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

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
        onPress={() => handleisEmpty(mail)}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Recuperar
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

export default OlvideMiContraseña;
