import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

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
