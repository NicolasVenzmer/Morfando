import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import CardFavoritos from '../components/CardFavoritos';
import {AuthContext, ErrorReference} from '../context/AuthContext';
import {useRoute} from '@react-navigation/native';
import CardOpinion from '../components/CardOpinion';
import StarRating from '../components/CardStarRating';
import {set} from 'react-native-reanimated';

const Opiniones = ({navigation}) => {
  const route = useRoute();
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState('');
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    if (!route?.params?.restaurant) return;
    const restaurant = route?.params?.restaurant;
    //console.log("restaurante", restaurant.opiniones);
    const opiniones = restaurant.opiniones;
    const dataList = opiniones.map(
      ({usuario_id, usuario, calificacion, comentario}) => ({
        usuario_id: usuario_id,
        usuario: usuario.nombre,
        calificacion: calificacion,
        comentario: comentario,
      }),
    );
    //console.log('estoy en datalist', dataList);
    setOpinions(dataList);
    setRestaurant(restaurant);
    //getOpinions()
    // if (opinions) {
    //   setOpinions([...opinions, opinions]);
    // }
  }, [route.params]);

  // console.log(
  //   'Estoy en Opiniones, las opiniones del restaurante son: ',
  //   opinions,
  // );

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
          height: '80%',
        }}>
        {!opinions?.length > 0 ? (
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
              Aun no hay opiniones.
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <>
            {opinions.map((opinion, index) => (
              <CardOpinion key={index} opinion={opinion} />
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
