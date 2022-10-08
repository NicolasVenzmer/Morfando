import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Plato from '../components/Plato';

const VerMenu = ({navigation}) => {
  const platos = [
    {
      id: 1,
      title: 'Entradas',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
    },
    {
      id: 2,
      title: 'Postre',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      vegano: true,
    },
    {
      id: 3,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 4,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 5,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 6,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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
          Menu
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {platos.map((plato, index) => (
          <Plato key={index} plato={plato} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerMenu;
