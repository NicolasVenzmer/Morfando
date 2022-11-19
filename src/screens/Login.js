import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {AuthContext, ErrorReference} from '../context/AuthContext';
import Helper from '../helper/helper';
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';

const Login = ({navigation}) => {
  const {login, error} = useContext(AuthContext);
  const netInfo = useNetInfo();
  const [mail, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [noWifi, setNoWifi] = useState(false);

  const handleisEmpty = () => {
    if (!Helper.validateEmail(mail) || Helper.isEmpty(password)) {
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

  useEffect(() => {
    if (error === ErrorReference[404]) {
      console.log(ErrorReference[404]);
      setVisible(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerHeader}>
        <Image source={require('../assets/logo_icon.png')} />
        <Text style={styles.textIngresar}>Ingresar</Text>
        <View style={styles.underlineIngresar} />
        <Pressable
          style={styles.pressableRegistrarse}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textRegistrarse}>Registrarse</Text>
        </Pressable>
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.containerGoogle}>
          <Image
            style={styles.imageGoogle}
            source={require('../assets/Icons/google_icon.png')}
          />
          <Text style={styles.textGoogle}>Ingresar con Google</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUsuario(text)}
            value={mail}
            placeholder="Email"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="black"
          />
        </View>

        <ModalPoup visible={visible}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: Theme.fonts.LARGE,
                color: Theme.colors.SECONDARY,
              }}>
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
                backgroundColor: Theme.colors.PRIMARY,
                borderRadius: 30,
              }}
              onPress={() => {
                navigation.navigate('Login');
                setVisible(false);
              }}>
              <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
                Aceptar
              </Text>
            </Pressable>
          </View>
        </ModalPoup>

        <ModalPoup visible={noWifi}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: Theme.fonts.LARGE,
                color: Theme.colors.SECONDARY,
              }}>
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
                setNoWifi(false);
              }}>
              <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={{
                alignSelf: 'center',
                width: '50%',
                marginVertical: 10,
                paddingVertical: 10,
                backgroundColor: Theme.colors.PRIMARY,
                borderRadius: 30,
              }}
              onPress={() => {
                {
                  login(mail, password);
                }
                setNoWifi(false);
              }}>
              <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
                Aceptar
              </Text>
            </Pressable>
          </View>
        </ModalPoup>

        <Pressable
          style={styles.pressableOlvideContraseña}
          onPress={() => navigation.navigate('OlvideMiContraseña')}>
          <Text style={styles.textOlvideContraseña}>
            Olvidaste tu contraseña?
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.botonIngresar}
        onPress={() => setNoWifi(handleisEmpty)}>
        <Text style={styles.textoBotonIngresar}>Ingresar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  containerHeader: {
    backgroundColor: Theme.colors.THIRD,
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIngresar: {
    position: 'absolute',
    color: Theme.colors.SECONDARY,
    bottom: 10,
    left: 70,
    fontWeight: Theme.fonts.THIN,
  },
  underlineIngresar: {
    backgroundColor: Theme.colors.PRIMARY,
    width: 90,
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 50,
  },
  pressableRegistrarse: {
    position: 'absolute',
    bottom: 10,
    right: 70,
  },
  textRegistrarse: {
    color: Theme.colors.SECONDARY,
    fontWeight: Theme.fonts.THIN,
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
    borderRadius: 30,
  },
  containerGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.THIRD,
    width: '80%',
    height: 50,
    top: 20,
    borderRadius: 10,
  },
  imageGoogle: {
    alignSelf: 'center',
    left: 10,
    width: 25,
    height: 25,
  },
  textGoogle: {
    color: Theme.colors.SECONDARY,
    fontWeight: Theme.fonts.THIN,
    left: 20,
  },
  inputContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    height: 150,
  },
  textInput: {
    color: 'black',
    width: '90%',
    height: 40,
    margin: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },
  pressableOlvideContraseña: {
    width: '78%',
    height: 20,
  },
  textOlvideContraseña: {
    color: Theme.colors.PRIMARY,
    fontStyle: Theme.fonts.ITALIC,
  },
  botonIngresar: {
    marginTop: 10,
    marginBottom: 10,
    position: 'absolute',
    width: '80%',
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.PRIMARY,
    borderRadius: 30,
  },
  textoBotonIngresar: {
    color: Theme.colors.THIRD,
    fontWeight: Theme.fonts.THIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
