import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CardRestaurante from '../components/CardRestaurante';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {data} from '../data/data';
import {BASE_URL} from '../config/config';
import axios from 'axios';

const MisRestaurantes = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [emptyRestaurants, setEmptyRestaurants] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  //const userRole = localStorage.getItem('role');

  const getRestaurants = async () => {
    axios
      .get(`${BASE_URL}/restaurants`)
      .then(res => {
        //console.log('DATA_: ', res.data);
        setRestaurants(res.data);
        setEmptyRestaurants(false);
      })
      .catch(e => {
        console.log(`Restaurants error ${e}`);
      });
    setLoading(false);
  };

  useEffect(() => {
    //getRestaurants();
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
          justifyContent: 'flex-start',
          marginBottom: 5,
        }}>
        <Ionicons
          name="menu"
          style={{
            color: 'black',
            marginLeft: 15,
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
          Mis Restaurantes
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '80%',
        }}>
        {emptyRestaurants ? (
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
              Aun no tienes restaurantes{'\n'}
              Crea uno nuevo!
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <>
            {restaurants.map(restaurant => (
              <CardRestaurante
                key={restaurant.id}
                restaurant={restaurant}
                navigation={navigation}
              />
            ))}
          </>
        )}
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
        onPress={() => navigation.navigate('CrearRestaurante')}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Nuevo
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MisRestaurantes;
