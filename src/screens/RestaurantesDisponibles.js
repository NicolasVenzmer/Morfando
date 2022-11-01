import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import {Searchbar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const RestaurantesDisponibles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const {userInfo} = useContext(AuthContext);

  // Obtengo los restaurantes de un owner en especifico
  const getRestaurants = async () => {
    const GET_RESTAURANTS_URL = '/restaurants';
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        //console.log(res.data);
        setRestaurants(res.data);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const addFavorite = async (restaurant) => {
    const ADD_FAVORITE_URL = '/user-favorites';
    
    const sendData = {
      usuario_id: userInfo.id,
      restaurante_id: restaurant.id,
    };
    console.log(sendData);
    axios
      .post(ADD_FAVORITE_URL, {data: sendData})
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
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
          Restaurantes cercanos
        </Text>
      </View>
      <View style={{width: '95%', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{width: '80%', left: 10}}>
          <Searchbar
            style={{borderRadius: 15}}
            placeholder="Buscar Restaurante"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <Ionicons
          name="filter"
          style={{
            color: 'black',
            left: 20,
            fontSize: 30,
          }}
          onPress={() => setVisibleFilters(true)}
        />
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
              Aun no hay restaurantes disponibles
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
              <CardRestauranteConsumidor
                key={restaurant.id}
                addFavorite={() => addFavorite(restaurant)}
                restaurant={restaurant}
                navigation={navigation}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <ModalPoup visible={visibleFilters}>
        <View style={{alignItems: 'center', height: '70%'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name="chevron-back-outline"
              style={{
                color: 'black',
                position: 'absolute',
                left: 1,
                fontSize: 30,
              }}
              onPress={() => setVisibleFilters(false)}
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
          <View style={{width: '100%', marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                fontFamily: 'Roboto',
              }}>
              Distancia respecto a tu ubicacion
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                fontFamily: 'Roboto',
              }}>
              Categoria
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                fontFamily: 'Roboto',
              }}>
              Rango de precio
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                fontFamily: 'Roboto',
              }}>
              Cantidad de estrellas
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            alignSelf: 'center',
            position: 'absolute',
            width: '100%',
            marginVertical: 10,
            paddingVertical: 10,
            backgroundColor: '#E14852',
            borderRadius: 30,
            bottom: 30,
          }}
          onPress={() => setVisibleFilters(false)}>
          <Text style={{color: 'white', textAlign: 'center'}}>Aplicar</Text>
        </Pressable>
      </ModalPoup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#F7F4F4',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalContainer2: {
    width: '80%',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default RestaurantesDisponibles;
