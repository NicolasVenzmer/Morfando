import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/logo_icon.png')}
        />
        <Text style={styles.buttonHeaderLoginTextStyle}>Login</Text>
        <Pressable
          style={styles.buttonTextPressable}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonHeaderSignUpTextStyle}>Sign-up</Text>
        </Pressable>
        <View style={styles.textUnderline} />
      </View>
      {/* <View style={styles.setUpViewButton}>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonTextStyle}>Siguiente</Text>
        </Pressable>
      </View> */}
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
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnderline: {
    backgroundColor: 'red',
    width: 90,
    height: 2,
    position: 'absolute',
    bottom: 0,
    right: 45,
  },
  setUpViewButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    position: 'relative',
    width: '80%',
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

export default SignUp;
