import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import CardRestaurante from '../components/CardRestaurante';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {data} from '../data/data';
import axios from '../api/axios';
const DELETE_RESTAURANTS_URL = '/restaurant';

const MisRestaurantes = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [emptyRestaurants, setEmptyRestaurants] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    const id = 1; // ACA TENGO QUE TRAER EL CONTEXT Y PASRA EL ID DEL USUARIO OWNER LOGEADO
    const GET_USER_RESTAURANTS_URL = `/users/${id}/restaurants`;
    axios
      .get(GET_USER_RESTAURANTS_URL)
      .then(res => {
        //console.log(res.data.misRestaurantes);
        setRestaurants(res.data.misRestaurantes);
        if (restaurants.length === 0) {
          setEmptyRestaurants(false);
        }
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  const deleteRestaurant = async restaurant => {
    const sendData = {
      id :restaurant.id,
      activo:false
    };
    console.log("El ID del restaurante a eliminar es: ", sendData.id)
    axios
      .delete(DELETE_RESTAURANTS_URL, sendData)
      .then(res => {
        console.log(res.status);
        if (res.status === 200){
          Alert.alert(
            'Se elimino con exito el restaurante ' + restaurants[id - 1].nombre,
          );
        }
        // const dataDelete = [...restaurants];
        // const index = restaurants[id];
        // dataDelete.splice(index, 1);
        // setRestaurants([...dataDelete]);
        
      })
      .catch(e => {
        console.log(`Restaurants DELETE error ${e}`);
      });
  };

  useEffect(() => {
    getRestaurants();
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
            {restaurants?.map(restaurant => (
              <CardRestaurante
                key={restaurant?.id}
                restaurant={restaurant}
                navigation={navigation}
                deleteRestaurant={() => deleteRestaurant(restaurant)}
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
