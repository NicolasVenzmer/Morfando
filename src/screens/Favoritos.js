import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import CardFavoritos from '../components/CardFavoritos';
import {AuthContext, ErrorReference} from '../context/AuthContext';

const Favoritos = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  // Obtengo los restaurantes de un owner en especifico
  const getFavorites = async () => {
    //CHEQUEAR ESTO YA QUE NO FUNCIONA BIEN
    setLoading(true);
    const id = userInfo.id;
    const GET_FAVORITES_URL = `/user/${id}/favorites`;
    axios
      .get(GET_FAVORITES_URL)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.favorite);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  console.log(restaurants)

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
          Favoritos
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {!restaurants?.length > 0 ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                position: 'absolute',
                fontSize: 20,
                fontWeight: '450',
                textAlign: 'center',
              }}>
              No tenes ningun favorito
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {restaurants?.map(restaurant => (
              <CardFavoritos
                key={restaurant.id}
                restaurant={restaurant}
                navigation={navigation}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favoritos;
