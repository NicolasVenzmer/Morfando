import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';

const AltaUsuarioConExito = ({navigation}) => {
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
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          height: 150,
          top: 50,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            width: '60%',
            height: 140,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Se envio un email de verificacion de cuenta. Una vez que ingreses al
          link enviado, tu cuenta se encontrara habilitada.
        </Text>
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
        onPress={() => navigation.navigate('SignUp')}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Comenzar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AltaUsuarioConExito;
