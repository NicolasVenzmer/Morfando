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
import CardRestaurante from '../components/CardRestaurante';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {data} from '../data/data';
import axios from '../api/axios';
import {AuthContext, ErrorReference} from '../context/AuthContext';

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

const MisRestaurantes = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [emptyRestaurants, setEmptyRestaurants] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [visible, setVisible] = useState(false);

  // Obtengo los restaurantes de un owner en especifico
  const getRestaurants = async () => {
    const id = userInfo.id;
    const GET_USER_RESTAURANTS_URL = `/users/${id}/restaurants`;
    axios
      .get(GET_USER_RESTAURANTS_URL)
      .then(res => {
        //console.log(res.data.misRestaurantes);
        setRestaurants(res.data.misRestaurantes);
        if (restaurants.length !== 0) {
          setEmptyRestaurants(false);
        }
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  // Elimino un restaurante en especifico
  const deleteRestaurant = async restaurant => {
    setVisible(true);
    const sendData = {
      id: restaurant.id,
      activo: false,
    };
    console.log('El ID del restaurante a eliminar es: ', sendData.id);
    const DELETE_RESTAURANTS_URL = '/restaurant';
    axios
      .delete(DELETE_RESTAURANTS_URL, sendData)
      .then(res => {
        console.log(res.status);
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
          // sacar los fragments
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

export default MisRestaurantes;
