import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from '../api/axios';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const CardFavoritos = ({favorito, navigation, deleteFavorite}) => {
  //console.log("Card de Favoritos: ",favorito.restaurante.imagenes[0].imagen)
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(true);
  const getRestaurants = async () => {
    const GET_RESTAURANT_URL = `/restaurant${favorito.restaurante.id}`;
    axios
      .get(GET_RESTAURANT_URL)
      .then(res => {
        //console.log(res.data[0]);
        setRestaurant(res.data[0]);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  return (
    <>
      {favorito.activo ? (
        <View
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
              source={{uri: favorito.restaurante.imagenes[0].imagen}}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Pressable
              onPress={() =>
                navigation.navigate('DetalleRestaurante', {restaurant})
              }>
              <Text
                style={{
                  top: 10,
                  color: 'black',
                  fontWeight: '500',
                  flexWrap: 'wrap',
                }}>
                {favorito.restaurante.nombre}
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
            </Pressable>
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
        </View>
      ) : null}
    </>
  );
};

export default CardFavoritos;
