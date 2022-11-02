import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import StarRating from '../components/CardStarRating';

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
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          Nombre 
        </Text>
        <StarRating givenWidth={20} givenHeight={20} left={20} />
      </View>
      <View style={{width: '100%', top: 20}}>
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
    </View>
  );
};

export default CardOpinion;
