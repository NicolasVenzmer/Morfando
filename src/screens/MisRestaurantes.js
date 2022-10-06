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
import Ionicons from 'react-native-vector-icons/Ionicons';
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
          marginBottom: 5,
        }}>
        <Ionicons
          name="menu"
          style={{
            color: 'black',
            marginLeft: 35,
            marginRight: 30,
            fontSize: 20,
          }}
          onPress={() => navigation.openDrawer()}
        />
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
          <CardRestaurante
            key={restaurante.id}
            restaurante={restaurante}
            navigation={navigation}
          />
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
