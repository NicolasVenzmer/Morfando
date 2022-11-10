import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import CardRestaurante from '../components/CardRestaurante';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
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

const MisRestaurantes = ({navigation}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  console.log('Token: ', userToken);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState({ok: () => {}, cancel: () => {}});

  // Obtengo los restaurantes de un owner en especifico
  const getRestaurants = async () => {
    setLoading(true);
    const id = userInfo.id;
    const GET_USER_RESTAURANTS_URL = `/users/${id}/restaurants`;
    axios
      .get(GET_USER_RESTAURANTS_URL)
      .then(res => {
        //console.log(res.data.misRestaurantes);
        setRestaurants(res.data.misRestaurantes);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      })
      .finally(() => setLoading(false));
  };
  const withVisibleFalse = func => {
    return async () => {
      await Promise.resolve(func());
      setVisible(false);
    };
  };
  const withConfirmationDialog = function (onConfirmed, onCancelled) {
    const defaultCallback = () => {};

    return () => {
      const ok = withVisibleFalse(onConfirmed || defaultCallback);
      const cancel = withVisibleFalse(onCancelled || defaultCallback);
      setConfirm({ok, cancel});
      setVisible(true);
    };
  };

  // Elimino un restaurante en especifico
  const deleteRestaurant = async restaurant => {
    const sendData = {
      id: restaurant.id,
      activo: false,
    };
    console.log('El ID del restaurante a eliminar es: ', sendData.id);
    const DELETE_RESTAURANTS_URL = '/restaurant';
    axios
      .delete(DELETE_RESTAURANTS_URL, {data: sendData})
      .then(res => {
        const dataDelete = [...restaurants];
        const filteredData = dataDelete.filter(el => el.id != restaurant.id);
        setRestaurants(filteredData);
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
        {!restaurants?.length > 0 ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                flexDirection: 'row',
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 30,
              }}
              onPress={() => getRestaurants()}>
              <Ionicons
                name="reload-circle"
                style={{
                  color: '#E14852',
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontFamily: 'Roboto',
                }}>
                Buscar Restaurantes
              </Text>
            </Pressable>
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
            <Pressable
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                flexDirection: 'row',
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 30,
              }}
              onPress={() => getRestaurants()}>
              <Ionicons
                name="reload-circle"
                style={{
                  color: '#E14852',
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontFamily: 'Roboto',
                }}>
                Buscar Restaurantes
              </Text>
            </Pressable>
            {restaurants?.map(restaurant => (
              <CardRestaurante
                key={restaurant.id}
                restaurant={restaurant}
                navigation={navigation}
                deleteRestaurant={withConfirmationDialog(() =>
                  deleteRestaurant(restaurant),
                )}
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
            onPress={confirm?.cancel}>
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
            onPress={confirm?.ok}>
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
