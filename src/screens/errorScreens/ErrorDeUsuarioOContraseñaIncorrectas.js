import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  BackHandler,
} from 'react-native';

const ErrorDeUsuarioOContraseñaIncorrectas = ({navigation}) => {
  //Icono para ir a la pantalla anterior
  function handleBackButtonClick() {
    // navigation.goBack();
    // return true;
    if (navigation.canGoBack()) {
      navigation.dispatch(StackActions.pop(1));
    }
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
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ff0000',
        marginVertical: '1%',
      }}>
      <View
        style={{
          width: '100%',
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require('../../assets/Icons/error-icon.png')}
        />
      </View>
      <Text
        style={{
          fontSize: 15,
          color: 'black',
          width: '60%',
          height: 140,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        Usuario y/o contraseña incorrecta.
      </Text>
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
        onPress={() => handleBackButtonClick()}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Cerrar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ErrorDeUsuarioOContraseñaIncorrectas;