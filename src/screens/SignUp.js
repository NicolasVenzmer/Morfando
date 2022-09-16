import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const SignUp = ({navigation}) => {
  const [value, setValue] = useState("first");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/logo_icon.png')}
        />
        <Pressable
          style={styles.buttonTextPressable}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonHeaderLoginTextStyle}>Ingresar</Text>
        </Pressable>
        <Text style={styles.buttonHeaderSignUpTextStyle}>Registrarse</Text>
        <View style={styles.textUnderline} />
      </View>
      <View style={styles.boxContainer}>
        <RadioButton.Group
          onValueChange={value => setValue(value)}
          value={value}>
          <RadioButton.Item
            style={{flexDirection: 'row-reverse'}}
            color="#E14852"
            label="Tengo Restaurante(s)"
            value="first"
          />
          <RadioButton.Item
            style={{flexDirection: 'row-reverse'}}
            color="#E14852"
            label="Tengo hambre"
            value="second"
          />
        </RadioButton.Group>
      </View>
      {value === 'first' ? (
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('CompletarSignUp')}>
          <Text style={styles.buttonTextStyle}>Siguiente</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('LoginConsumidor')}>
          <Text style={styles.buttonTextStyle}>Siguiente</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ff0000',
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
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    top: 50,
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
    right: 60,
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
    color: 'black',
    fontWeight: '400',
  },
  buttonHeaderSignUpTextStyle: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    color: 'black',
    fontWeight: '400',
  },
  buttonTextPressable: {
    position: 'absolute',
    bottom: 10,
    left: 70,
  },
  logo: {
    width: 155,
    height: 157,
  },
});

export default SignUp;
