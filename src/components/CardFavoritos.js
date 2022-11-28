import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from '../api/axios';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';
import GetLocation from 'react-native-get-location';

const CardFavoritos = ({favorito, navigation, deleteFavorite}) => {
  //console.log("Card de Favoritos: ",favorito.restaurante.imagenes[0].imagen)
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(true);
  const [kilometers, setKilometers] = useState('');
  const [location, setLocation] = useState('');

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


  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const data = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setLocation(data);
        //console.log(data);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getKilometers = () => {
    const sendData = {
      latitudUsuario: location.latitude,
      longitudUsuario: location.longitude,
      latitudRestaurant: restaurant.latitud,
      longitudRestaurant: restaurant.longitud,
    };
    //console.log('Datos a enviar al back: ', sendData);
    const GEOLOCATION_URL = '/geolocation';
    axios
      .post(GEOLOCATION_URL, sendData)
      .then(res => {
        //console.log('KM GET Data: ', res.data.rows[0].elements[0].distance.text);
        setKilometers(res.data.rows[0].elements[0].distance.text);
      })
      .catch(e => {
        console.log(`KM error ${e}`);
      });
  };

  useEffect(() => {
    getRestaurants();
    getCurrentLocation();
  }, []);

  useEffect(getKilometers, [location]);

  return (
    <>
      {favorito.activo ? (
        <View
          style={{
            backgroundColor: '#F2F1F0',
            alignSelf: 'center',
            marginTop: 10,
            width: '40%',
            height: 260,
            borderRadius: 30,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 35,
              position: 'relative',
            }}>
            <Feather
              name="trash-2"
              style={{
                position: 'absolute',
                color: 'black',
                fontSize: 25,
                marginTop: 5,
                right: 10,
              }}
              onPress={deleteFavorite}
            />
          </View>
          <Pressable
            style={{
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
              alignSelf: 'center',
              width: '100%',
              height: 140,
            }}
            onPress={() =>
              navigation.navigate('DetalleRestaurante', {restaurant})
            }>
            <Image
              style={{
                borderTopRightRadius: 80,
                borderTopLeftRadius: 80,
                borderBottomLeftRadius: 80,
                borderBottomRightRadius: 80,
                alignSelf: 'center',
                width: '100%',
                height: 140,
              }}
              source={{uri: favorito?.restaurante?.imagenes[0]?.imagen}}
            />
          </Pressable>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                top: 10,
                color: 'black',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              {favorito?.restaurante?.nombre}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                color: '#E14852',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              {kilometers}
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
        </View>
      ) : null}
    </>
  );
};

export default CardFavoritos;
