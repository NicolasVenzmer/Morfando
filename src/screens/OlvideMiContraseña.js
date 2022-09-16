import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  BackHandler,
} from 'react-native';

const OlvideMiContraseña = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/logo_icon.png')}
        />
        <Text style={styles.buttonHeaderLoginTextStyle}>Ingresar</Text>
        <View style={styles.textUnderline} />
        <Pressable
          style={styles.buttonTextPressable}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonHeaderSignUpTextStyle}>Registrarse</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.backLogoPressable}
        onPress={() => handleBackButtonClick()}>
        <Image
          style={styles.backLogo}
          source={require('../assets/Icons/back_icon.png')}
        />
      </Pressable>
      <View style={styles.boxContainerEmail}>
        <Text style={styles.textoEmail}>
          Te hemos enviado un mail para que restablezcas tu contraseña.
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('RestaurarContraseña')}>
        <Text style={styles.buttonTextStyle}>Recuperar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxContainerEmail: {
    top: 35,
    maxWidth: '82%',
  },
  textoEmail: {color: 'black'},
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ff0000',
  },
  backLogoPressable: {
    alignSelf: 'flex-start',
    top: 20,
    left: 40,
  },
  backLogo: {
    width: 15,
    height: 15,
  },
  input: {
    width: '90%',
    height: 40,
    margin: 12,
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
  boxContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    top: 20,
    width: '80%',
    height: 150,
    borderRadius: 30,
  },
  textUnderline: {
    backgroundColor: '#E14852',
    width: 90,
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 50,
  },
  setUpViewButton: {
    bottom: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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

export default OlvideMiContraseña;
