import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

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
            alignSelf: 'flex-start',
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
          onChangeText={onChangeEmail}
          value={email}
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
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
      </View>
      <Pressable
        style={{
          width: '78%',
          height: 20,
          position: 'absolute',
          top: 440,
        }}
        onPress={() => navigation.navigate('OlvideMiContraseña')}>
        <Text style={{color: '#E14852', fontStyle: 'italic'}}>
          Olvidaste tu contraseña?
        </Text>
      </Pressable>
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
        onPress={() => navigation.navigate('MisRestaurantes')}>
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

export default Login;
