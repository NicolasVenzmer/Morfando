import React, {useContext} from 'react';
import {View, Text, Image, Pressable, SafeAreaView, Button} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthContext, ErrorReference} from '../context/AuthContext';

const LoginConsumidor = ({navigation}) => {
  const {SSOGoogle} = useContext(AuthContext);
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
        onPress={() => {
          GoogleSignin.configure({
            androidClientId:
              '763386562376-it05kregjrduu51masjd81knbhue5g7p.apps.googleusercontent.com',
            iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
          });
          GoogleSignin.hasPlayServices()
            .then(hasPlayService => {
              if (hasPlayService) {
                GoogleSignin.signIn()
                  .then(userInfo => {
                    SSOGoogle(userInfo)
                    console.log(JSON.stringify(userInfo));
                  })
                  .catch(e => {
                    console.log('ERROR IS: ' + JSON.stringify(e));
                  });
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '80%',
          height: 50,
          top: 100,
          borderRadius: 10,
        }}>
        <Image
          style={{
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
      </Pressable>
      {/* <Button
        title={'Ingresar con Google'}
        onPress={() => {
          GoogleSignin.configure({
            androidClientId:
              '763386562376-it05kregjrduu51masjd81knbhue5g7p.apps.googleusercontent.com',
            iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
          });
          GoogleSignin.hasPlayServices()
            .then(hasPlayService => {
              if (hasPlayService) {
                GoogleSignin.signIn()
                  .then(userInfo => {
                    console.log(JSON.stringify(userInfo));
                  })
                  .catch(e => {
                    console.log('ERROR IS: ' + JSON.stringify(e));
                  });
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }}
      /> */}
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
          Volver
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginConsumidor;
