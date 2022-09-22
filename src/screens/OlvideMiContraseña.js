import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';

const OlvideMiContraseña = ({navigation}) => {
  const [email, onChangeEmail] = useState(null);

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
          top: 35,
          maxWidth: '82%',
        }}>
        <Text style={{color: 'black'}}>
          Te hemos enviado un mail para que restablezcas tu contraseña.
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
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
      </View>
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
        onPress={() => navigation.navigate('RestaurarContraseña')}>
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

export default OlvideMiContraseña;
