import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardRestaurante = ({restaurante, navigation}) => {
  //Restaurante
  const deleteHandler = key => {
      const restaurante = ""
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        alignSelf: 'center',
        top: 10,
        width: '80%',
        height: 200,
        borderRadius: 30,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', height: 20}}>
        <Text
          style={{
            alignSelf: 'flex-start',
            top: 10,
            left: 20,
            color: 'black',
            fontWeight: '400',
          }}>
          {restaurante.title}
        </Text>
        <MaterialIcons
          name="menu-book"
          style={{
            color: '#E14852',
            fontSize: 20,
            top: 10,
            left: 125,
            alignSelf: 'flex-end',
          }}
          onPress={() => navigation.navigate('CrearMenu')}
        />
        <Feather
          name="trash-2"
          style={{
            color: '#E14852',
            fontSize: 20,
            top: 10,
            left: 130,
            alignSelf: 'flex-end',
          }}
          onPress={() => deleteHandler()}
        />
      </View>
      <Image
        style={{
          top: 20,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          alignSelf: 'center',
          width: '90%',
          height: 150,
        }}
        source={restaurante.image}
      />
    </View>
  );
};

export default CardRestaurante;
