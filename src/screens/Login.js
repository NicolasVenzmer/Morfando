import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {set} from 'react-native-reanimated';

const Login = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [show, setShow] = React.useState(false);
  return (
    <>
      {!show ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/logo_icon.png')}
            />
            <Text style={styles.buttonHeaderLoginTextStyle}>Login</Text>
            <View style={styles.textUnderline} />
            <Pressable
              style={styles.buttonTextPressable}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.buttonHeaderSignUpTextStyle}>Sign-up</Text>
            </Pressable>
          </View>
          <View style={styles.googleContainer}>
            <Image
              style={styles.googleLogo}
              source={require('../assets/Icons/google_icon.png')}
            />
            <Text style={styles.googleText}>Login with Google</Text>
          </View>
          <View style={styles.appleContainer}>
            <Image
              style={styles.googleLogo}
              source={require('../assets/Icons/apple_icon.png')}
            />
            <Text style={styles.appleText}>Login with Google</Text>
          </View>
          <View style={styles.boxContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
          <Pressable
            style={styles.olvidasteContraseñaPressable}
            onPress={() => setShow(true)}>
            <Text style={styles.textoOlvidasteContraseña}>
              Olvidaste tu contraseña?
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/logo_icon.png')}
            />
            <Text style={styles.buttonHeaderLoginTextStyle}>Login</Text>
            <View style={styles.textUnderline} />
            <Pressable
              style={styles.buttonTextPressable}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.buttonHeaderSignUpTextStyle}>Sign-up</Text>
            </Pressable>
          </View>
          <View style={styles.boxContainerContraseñaOlvidada}>
            <Text style={styles.textoMailEnviadoContraseña}>
              Te hemos enviado un mail para que restablezcas tu contraseña.
            </Text>
          </View>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ff0000',
  },
  olvidasteContraseñaPressable: {
    width: '78%',
    height: 20,
    position: 'absolute',
    top: 475,
  },
  textoMailEnviadoContraseña: {
    color: 'black',
  },
  boxContainerContraseñaOlvidada: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 150,
    top: 50,
  },
  textoOlvidasteContraseña: {color: '#E14852', fontStyle: 'italic'},
  googleLogo: {
    alignSelf: 'flex-start',
    alignSelf: 'center',
    left: 10,
    width: 25,
    height: 25,
  },
  googleText: {
    color: 'black',
    fontWeight: '400',
    left: 20,
  },
  appleText: {
    color: 'white',
    fontWeight: '400',
    left: 20,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    top: 10,
    borderRadius: 10,
  },
  appleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '80%',
    height: 50,
    top: 20,
    borderRadius: 10,
  },
  boxContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    height: 150,
  },
  input: {
    width: '90%',
    height: 40,
    margin: 5,
    borderBottomColor: 'grey', // Add this to specify bottom border color
    borderBottomWidth: 1,
    padding: 10,
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnderline: {
    backgroundColor: '#E14852',
    width: 90,
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 45,
  },
  buttonStyle: {
    position: 'absolute',
    width: '80%',
    top: 500,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E14852',
    borderRadius: 30,
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeaderLoginTextStyle: {
    position: 'absolute',
    color: 'black',
    bottom: 10,
    left: 70,
    fontWeight: '400',
  },
  buttonHeaderSignUpTextStyle: {
    color: 'black',
    fontWeight: '400',
  },
  buttonHeaderTextStyle: {
    color: 'black',
    fontWeight: '400',
  },
  buttonTextPressable: {
    position: 'absolute',
    bottom: 10,
    right: 70,
  },
  logo: {
    width: 155,
    height: 157,
  },
});

export default Login;
