import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView, Pressable} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import CardFavoritos from '../components/CardFavoritos';
import {AuthContext, ErrorReference} from '../context/AuthContext';
import {useRoute} from '@react-navigation/native';
import CardOpinion from '../components/CardOpinion';
import StarRating from '../components/CardStarRating';

const Opiniones = ({navigation}) => {
  const route = useRoute();
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState('');
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    const restaurant = route.params.restaurant;
    const opinions = route.params.restaurant.opinion;
    setOpinions(opinions);
    setRestaurant(restaurant);
  }, []);

  //console.log('Estoy en Opiniones, la data del restaurante es: ', restaurant);
  console.log(
    'Estoy en Opiniones, las opiniones del restaurante son: ',
    opinions,
  );

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}>
        <Ionicons
          name="chevron-back-outline"
          style={{
            color: 'black',
            position: 'absolute',
            left: 15,
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          {restaurant.nombre}
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {/* Mapeo esto en base a todas las opiniones */}
        <CardOpinion restaurant={restaurant}/>
      </ScrollView>
      <Pressable
        style={{
          marginTop: 10,
          marginBottom: 10,
          position: 'relative',
          width: '80%',
          bottom: 0,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
        onPress={() =>
          navigation.navigate('OpinarSobreRestaurante', {restaurant})
        }>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Opinar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Opiniones;
