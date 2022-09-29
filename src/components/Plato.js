import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

const Plato = ({plato}) => {

  return (
    <View
      style={{
        width: '100%',
      }}>
      <Text
        style={{
          color: 'black',
          fontWeight: '350',
          width: '80%',
          alignSelf: 'center',
          left: 5,
          marginBottom: 5,
        }}>
        {plato.title}
      </Text>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          borderRadius: 10,
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 1},
          shadowRadius: 10,
          elevation: 2,
          backgroundColor: 'white',
          marginBottom: 10,
          minHeight: 100,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 90, height: 90, margin: 5, borderRadius: 30}}
            source={plato.image}
          />
          <View
            style={{
              width: '65%',
              height: 100,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
              }}>
              {plato.nombre}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontWeight: '250',
                marginTop: 5,
                fontSize: 12,
              }}>
              {plato.descripcion}
            </Text>
            <Text
              style={{
                color: 'red',
                fontWeight: '250',
                bottom: -20,
              }}>
              {plato.precio}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Plato;
