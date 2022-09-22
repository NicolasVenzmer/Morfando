import React, {useState} from 'react';
import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {RadioButton} from 'react-native-paper';

const SignUp = ({navigation}) => {
  const [value, setValue] = useState('first');

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
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'flex-start',
          justifyContent: 'center',
          top: 50,
          width: '80%',
          height: 150,
          borderRadius: 30,
        }}>
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
          onPress={() => navigation.navigate('CompletarSignUp')}>
          <Text
            style={{
              color: '#fdfdfd',
              fontWeight: '400',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Siguiente
          </Text>
        </Pressable>
      ) : (
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
          onPress={() => navigation.navigate('LoginConsumidor')}>
          <Text
            style={{
              color: '#fdfdfd',
              fontWeight: '400',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Siguiente
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default SignUp;
