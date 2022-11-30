import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import {AuthContext} from '../context/AuthContext';
import {useRoute} from '@react-navigation/native';
import StarRating from '../components/CardStarRating';
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';

const OpinarSobreRestaurante = ({navigation}) => {
  const route = useRoute();
  const {userInfo} = useContext(AuthContext);
  const [opinion, setOpinion] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [opinions, setOpinions] = useState([]);
  const [opinionCreada, setVisibleOpinionCreada] = useState(false);
  const [calificacion, setCalificacion] = useState('');

  useEffect(() => {
    const restaurant = route.params.restaurant;
    const opinions = route.params.restaurant.opinion;
    setOpinions(opinions);
    setRestaurant(restaurant);
  }, []);

  const onChangeCalificacion = input => {
    setCalificacion(input);
  };

  //Enviar los datos al back
  const crearOpinion = () => {
    setIsLoading(true);
    const sendData = {
      usuario_id: userInfo.id,
      restaurante_id: restaurant.id,
      comentario: opinion,
      calificacion: calificacion,
    };
    const CREATE_OPINION_URL = '/opinion';
    axios
      .post(CREATE_OPINION_URL, sendData)
      .then(res => {
        setOpinions([...opinions, opinion]);
        navigation.navigate('RestaurantesDisponibles');
      })
      .catch(e => {
        console.log(`Opinion error ${e}`);
      });
    setVisibleOpinionCreada(true);
    setIsLoading(false);
  };

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
        <View
          style={{
            top: 10,
            width: '100%',
            alignSelf: 'center',
          }}>
          <StarRating
            givenWidth={40}
            givenHeight={40}
            left={0}
            onChangeCalificacion={onChangeCalificacion}
          />
          <TextInput
            style={{
              color: 'black',
              top: 10,
              width: '80%',
              minHeight: 200,
              padding: 10,
              backgroundColor: '#D9D9D9',
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}
            multiline={true}
            textAlignVertical="top"
            onChangeText={setOpinion}
            value={opinion}
            placeholder="Comparte detalles de tu experiencia en este lugar..."
            placeholderTextColor="black"
          />
        </View>
      </ScrollView>

      <ModalPoup visible={opinionCreada}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>Opinion guardada.</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1%',
            marginBottom: '1%',
            marginHorizontal: '1%',
          }}>
          <Pressable
            style={{
              alignSelf: 'center',
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              setVisibleOpinionCreada(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

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
        onPress={() => crearOpinion()}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Guardar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default OpinarSobreRestaurante;
