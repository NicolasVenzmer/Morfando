import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const CardFavoritos = ({restaurant, navigation, deleteFavorite}) => {
  //NO ME TRAE LA IMAGEN EN FAVORITOS
  console.log("favorito",restaurant)
  return (
    <>
      {restaurant.activo ? (
        <Pressable
          onPress={() =>
            navigation.navigate('DetalleRestaurante', {restaurant})
          }
          style={{
            backgroundColor: '#F2F1F0',
            alignSelf: 'center',
            top: 10,
            width: '40%',
            height: 250,
            borderRadius: 30,
            margin: 10,
          }}>
          <View
            style={{
              width: '100%',
              padding: 10,
              position: 'relative',
            }}>
            <Feather
              name="trash-2"
              style={{
                position: 'absolute',
                color: 'black',
                fontSize: 25,
                top: 5,
                right: 10,
              }}
              onPress={deleteFavorite}
            />
            <Image
              style={{
                top: 10,
                borderTopRightRadius: 80,
                borderTopLeftRadius: 80,
                borderBottomLeftRadius: 80,
                borderBottomRightRadius: 80,
                alignSelf: 'center',
                width: '100%',
                height: 140,
              }}
              //source={{uri: restaurant.imagenes[0]?.imagen}}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                top: 10,
                color: 'black',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              {restaurant.restaurante.nombre}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                color: '#E14852',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              0,5 KM
            </Text>
            <MaterialIcons
              name="menu-book"
              style={{
                color: '#E14852',
                fontSize: 30,
                top: 10,
              }}
              onPress={() =>
                navigation.navigate('VerMenuConsumidor', {restaurant})
              }
            />
          </View>
        </Pressable>
      ) : null}
    </>
  );
};

export default CardFavoritos;
