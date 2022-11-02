import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const CardOpinion = ({restaurant}) => {
  return (
    <View
      style={{
        width: '80%',
        height: 100,
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          {restaurant.nombre}
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
            left: 20,
          }}>
          Estrellas
        </Text>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 15,
          fontFamily: 'Roboto',
        }}>
        Comentario
      </Text>
      <View
        style={{
          backgroundColor: '#E14852',
          width: '100%',
          height: 2,
          top: 10,
          bottom: 0,
        }}
      />
    </View>
  );
};

export default CardOpinion;
