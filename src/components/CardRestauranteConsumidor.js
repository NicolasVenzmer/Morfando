import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';
import {useEffect} from 'react';
import axios from '../api/axios';

const CardRestauranteConsumidor = ({
  restaurant,
  addFavorite,
  navigation,
  location,
}) => {
  //console.log("estoy en la card de restaurante del consumidor", restaurant.longitud)

  const [loading, setIsLoading] = useState(false);
  const [km, setKm] = useState();

  // //Enviar los datos al back
  // const obtenerKM = () => {
  //   setIsLoading(true);
  //   const sendData = {
  //     latitudUsuario: location.latitude,
  //     longitudUsuario: location.longitude,
  //     latitudRestaurant: restaurant.latitud,
  //     longitudRestaurant: restaurant.longitud,
  //   };
  //   //console.log('Datos a enviar al back: ', sendData);
  //   const GET_KM_URL = '/geolocation';
  //   axios
  //     .post(GET_KM_URL, sendData)
  //     .then(res => {
  //       //console.log('KM', res.data.rows);
  //       // navigation.navigate('Opiniones', {opinions});

  //       //console.log('GeoLocation Created Data: ', res.data);
  //     })
  //     .catch(e => {
  //       console.log(`GeoLocation error ${e}`);
  //     });
  //   setIsLoading(false);
  // };

  useEffect(() => {
    //obtenerKM();
  }, []);

  return (
    <>
      {restaurant.activo ? (
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
            <Ionicons
              name="heart-outline"
              style={{
                position: 'absolute',
                color: 'black',
                fontSize: 25,
                top: 5,
                right: 10,
              }}
              onPress={addFavorite}
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
              source={{uri: restaurant.imagenes[0]?.imagen}}
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

export default CardRestauranteConsumidor;
