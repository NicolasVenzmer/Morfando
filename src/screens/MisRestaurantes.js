import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CardRestaurante from '../components/CardRestaurante';
import {data} from '../data/data';

const MisRestaurantes = ({navigation}) => {
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
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Pressable
          style={{
            marginLeft: 35,
            marginRight: 30,
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
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
          }}>
          Mis Restaurantes
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '75%',
        }}>
        {data.map(restaurante => (
          <CardRestaurante key={restaurante.id} restaurante={restaurante} navigation={navigation}/>
        ))}
      </ScrollView>
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
        onPress={() => navigation.navigate('CrearRestaurante')}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Nuevo
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MisRestaurantes;
