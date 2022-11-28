import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';
import {useEffect} from 'react';
import axios from '../api/axios';
import GetLocation from 'react-native-get-location';

const CardRestauranteConsumidor = ({restaurant, addFavorite, navigation}) => {
  // console.log(
  //   'estoy en la card de restaurante del consumidor',
  //   restaurant,
  // );

  const [loading, setIsLoading] = useState(false);
  const [kilometers, setKilometers] = useState('');
  const [location, setLocation] = useState('');

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
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
    getCurrentLocation();
  }, []);
  useEffect(getKilometers, [location]);

  return (
    <>
      {restaurant.activo ? (
        <View
          style={{
            backgroundColor: '#F2F1F0',
            alignSelf: 'center',
            top: 10,
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
            <Ionicons
              name="heart-outline"
              style={{
                position: 'absolute',
                color: 'black',
                fontSize: 25,
                marginTop: 5,
                right: 10,
              }}
              onPress={addFavorite}
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
              source={{uri: restaurant?.imagenes[0]?.imagen}}
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
              {restaurant.nombre}
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

export default CardRestauranteConsumidor;
