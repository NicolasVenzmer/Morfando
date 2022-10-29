import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import {AuthContext, ErrorReference} from '../context/AuthContext';
import {Searchbar} from 'react-native-paper';

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
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [emptyRestaurants, setEmptyRestaurants] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  // Obtengo los restaurantes de un owner en especifico
  const getRestaurants = async () => {
    const id = userInfo.id;
    const GET_RESTAURANTS_URL = "/restaurants";
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        console.log(res.data);
        //setRestaurants(res.data.Restaurantes);
        // Chequeo si el array contiene restaurants o si esta vacio
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    console.log(restaurants.length);
    if (restaurants.length > 0) {
      setEmptyRestaurants(false);
    }
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
      <View style={{width: '85%', marginTop: 10}}>
        <Searchbar
          style={{borderRadius: 15}}
          placeholder="Buscar Restaurante"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
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
              Aun no hay restaurantes disponibles
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          // sacar los fragments
          <>
            <CardRestauranteConsumidor />
            {/* {restaurants?.map(restaurant => (
              <CardRestauranteConsumidor
                key={restaurant?.id}
                restaurant={restaurant}
                navigation={navigation}
                deleteRestaurant={() => deleteRestaurant(restaurant)}
              />
            ))} */}
          </>
        )}
      </ScrollView>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Esta seguro que desea eliminar el restaurante?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}></View>
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
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('MisRestaurantes');
              setVisible(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'center',
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              {
                deleteRestaurant();
              }
              setVisible(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
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
