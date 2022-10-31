import React, {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import CardFavoritos from '../components/CardFavoritos';

const Filtros = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  // Obtengo los restaurantes de un owner en especifico
  const getFavorites = async () => {
    const GET_FAVORITES_URL = '/restaurants';
    axios
      .get(GET_FAVORITES_URL)
      .then(res => {
        //console.log(res.data);
        setRestaurants(res.data.favorite);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  useEffect(() => {
    getFavorites();
  }, []);

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
          name="menu"
          style={{
            color: 'black',
            position: 'absolute',
            left: 15,
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.openDrawer()}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          Filtros
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filtros;
