import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DefaultImage from "../assets/Images/upload-restaurant-image.jpg"

const CardRestaurante = ({restaurant, navigation, deleteRestaurant}) => {

  return (
    <>
      {restaurant.activo ? (
        <Pressable
          onPress={() => navigation.navigate('VerMenu')}
          style={{
            backgroundColor: '#F2F1F0',
            alignSelf: 'center',
            top: 10,
            width: '80%',
            height: 200,
            borderRadius: 30,
            marginBottom: 10,
          }}>
          <View
            style={{flexDirection: 'row', height: 20, position: 'relative'}}>
            <Text
              style={{
                alignSelf: 'flex-start',
                top: 10,
                left: 20,
                color: 'black',
                fontWeight: '400',
                marginRight: 'auto',
              }}>
              {restaurant?.nombre}
            </Text>
            <MaterialIcons
              name="menu-book"
              style={{
                color: '#E14852',
                fontSize: 20,
                top: 10,
                right: 20,
              }}
              onPress={() => navigation.navigate('CrearMenu', {restaurant})}
            />
            <Feather
              name="trash-2"
              style={{
                color: '#E14852',
                fontSize: 20,
                top: 10,
                right: 15,
              }}
              onPress={deleteRestaurant}
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
            source={restaurant.restaurantImage}
          />
        </Pressable>
      ) : null}
    </>
  );
};

export default CardRestaurante;
