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

const IngresarNuevaContraseña = ({navigation, route}) => {
  const params = route.params || {};
  const {userId} = params;
  console.log(userId);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [visible, setVisible] = useState(false);
  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false);

  const handleisEmpty = () => {
    if (isEmpty(password) || isEmpty(password2) || password != password2) {
      setVisiblePasswordModal(true);
    }else {
      navigation.navigate('SignUp');
    }
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
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '40%',
          borderRadius: 30,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            top: 40,
            width: '80%',
            height: 150,
            borderRadius: 30,
          }}>
          <TextInput
            style={{
              color: 'black',
              width: '90%',
              height: 40,
              margin: 12,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              padding: 10,
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Ingresar Nueva Contraseña"
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              color: 'black',
              width: '90%',
              height: 40,
              margin: 12,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              padding: 10,
            }}
            onChangeText={setPassword2}
            value={password2}
            secureTextEntry={true}
            placeholder="Repetir Nueva Contraseña"
            placeholderTextColor="black"
          />
        </View>
      </View>

      <ModalPoup visible={visiblePasswordModal}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Las contraseñas no son iguales.
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
              navigation.navigate('IngresarNuevaContraseña');
              setVisiblePasswordModal(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

      <Pressable
        style={{
          marginTop: 10,
          marginBottom: 10,
          //position: 'absolute',
          width: '80%',
          bottom: 0,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
        onPress={() => handleisEmpty()}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Guardar
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

export default IngresarNuevaContraseña;
