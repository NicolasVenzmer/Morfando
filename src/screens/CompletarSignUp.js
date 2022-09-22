import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';

const CompletarSignUp = ({navigation}) => {
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
        <Pressable
          style={{
            position: 'absolute',
            bottom: 10,
            left: 70,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: 'black',
              fontWeight: '400',
            }}>
            Ingresar
          </Text>
        </Pressable>
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            right: 70,
            color: 'black',
            fontWeight: '400',
          }}>
          Registrarse
        </Text>
        <View
          style={{
            backgroundColor: '#E14852',
            width: 90,
            height: 2,
            position: 'absolute',
            bottom: 0,
            right: 60,
          }}
        />
      </View>
      <Pressable
        style={{
          alignSelf: 'flex-start',
          top: 20,
          left: 40,
        }}
        onPress={() => navigation.navigate('SignUp')}>
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
          alignItems: 'flex-start',
          justifyContent: 'center',
          top: 40,
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
        <TextInput
          style={{
            width: '90%',
            height: 40,
            margin: 12,
            borderBottomColor: 'grey', // Add this to specify bottom border color
            borderBottomWidth: 1,
            padding: 10,
          }}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
        <TextInput
          style={{
            width: '90%',
            height: 40,
            margin: 12,
            borderBottomColor: 'grey', // Add this to specify bottom border color
            borderBottomWidth: 1,
            padding: 10,
          }}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Repita la Contraseña"
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
        onPress={() => navigation.navigate('AltaUsuarioConExito')}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Registrarse
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CompletarSignUp;
