import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const PlatoType = plato => {
  if (!plato.aptoVegano && !plato.aptoCeliaco) return;

  if (plato.aptoVegano && plato.aptoCeliaco)
    return (
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginTop: 2,
          }}
          source={require('../assets/Icons/icono-vegano.png')}
        />
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../assets/Icons/icono-celiaco.png')}
        />
      </View>
    );

  if (plato.aptoVegano === "")
    return (
      <Image
        style={{
          width: 30,
          height: 30,
          marginTop: 5,
          alignSelf: 'flex-end',
        }}
        source={require('../assets/Icons/icono-vegano.png')}
      />
    );

  return (
    <Image
      style={{
        width: 30,
        height: 30,
        marginTop: 5,
        alignSelf: 'flex-end',
      }}
      source={require('../assets/Icons/icono-celiaco.png')}
    />
  );
};

const Plato = ({plato}) => {
  //console.log("estoy en plato", categoria)
  return (
    // <View
    //   style={{
    //     width: '100%',
    //   }}>
    //   <Text
    //     style={{
    //       color: 'black',
    //       fontWeight: '350',
    //       width: '80%',
    //       alignSelf: 'center',
    //       left: 5,
    //       marginBottom: 5,
    //     }}>
    //     {categoria.nombre}
    //   </Text>
    <>
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
            source={plato.plato_imagen === '' || DefaultRestaurantImage}
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
              {plato?.nombre}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontWeight: '250',
                marginTop: 5,
                fontSize: 12,
              }}>
              {plato?.ingredientes}
            </Text>
            <Text
              style={{
                color: 'red',
                fontWeight: '250',
                bottom: -20,
              }}>
              {`$${plato.precio}` || 'No disponible'}
            </Text>
            <PlatoType {...plato} />
          </View>
        </View>
      </View>
    </>
    // </View>
  );
};

export default Plato;
