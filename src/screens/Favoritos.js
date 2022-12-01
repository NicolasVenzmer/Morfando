import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import CardFavoritos from '../components/CardFavoritos';
import {AuthContext} from '../context/AuthContext';
import ModalPoup from '../components/ModalPopUp';
import GetLocation from 'react-native-get-location';

const Favoritos = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState({ok: () => {}, cancel: () => {}});
  const [location, setLocation] = useState('');
  const [newRestaurants, setNewRestaurants] = useState([]);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const data = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setLocation(data);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getKilometers = async () => {
    console.log("fav", favoritos)
    const updatedRestaurants = await Promise.all(
      favoritos?.map(async restaurant => {
        const sendData = {
          latitudUsuario: location.latitude,
          longitudUsuario: location.longitude,
          latitudRestaurant: restaurant.restaurante.latitud,
          longitudRestaurant: restaurant.restaurante.longitud,
        };
        console.log('Datos a enviar al back: ', sendData);
        const GEOLOCATION_URL = '/geolocation';
        const res = await axios.post(GEOLOCATION_URL, sendData).catch(e => {
          console.log(`KM error ${e}`);
        });
        return {
          ...restaurant,
          distance: res?.data?.rows[0]?.elements[0]?.distance?.text,
        };
      }),
    );

    setNewRestaurants(updatedRestaurants);
  };

  // Obtengo los favoritos
  const getFavorites = async () => {
    setLoading(true);
    const id = userInfo.id;
    const GET_FAVORITES_URL = `/user${id}`;
    axios
      .get(GET_FAVORITES_URL)
      .then(res => {
        setFavoritos(res.data[0].favorite);
        //console.log("favoritos:", res.data[0].favorite)
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

  // Elimino un favorito en especifico
  const deleteFavorite = async favorito => {
    const sendData = {
      usuario_id: userInfo.id,
      restaurante_id: favorito.restaurante.id,
      activo: false,
    };
    //console.log('El favorito a eliminar es: ', sendData);
    const DELETE_FAVORITE_URL = '/user-favorites';
    axios
      .delete(DELETE_FAVORITE_URL, {data: sendData})
      .then(res => {
        const dataDelete = [...favoritos];
        const filteredData = dataDelete.filter(el => el.id != favorito.id);
        setFavoritos(filteredData);
        setNewRestaurants(filteredData)
      })
      .catch(e => {
        console.log(`Restaurants DELETE error ${e}`);
      });
  };

  useEffect(() => {
    getFavorites();
    getCurrentLocation();
  }, []);
  useEffect(() => {
    if (favoritos && favoritos.length > 0) {
      getKilometers();
    }
  }, [location, favoritos]);

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
        {newRestaurants?.length < 0 ? (
          <>
            <Pressable
              style={{
                marginTop: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                flexDirection: 'row',
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 30,
              }}
              onPress={() => getFavorites()}>
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
                Actualizar Restaurantes
              </Text>
            </Pressable>
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
              <Image
                source={require('../assets/Images/empty-restaurants.png')}
              />
            </View>
          </>
        ) : (
          <>
            <Pressable
              style={{
                marginTop: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                flexDirection: 'row',
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 30,
              }}
              onPress={() => getFavorites()}>
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
                Actualizar Restaurantes
              </Text>
            </Pressable>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {newRestaurants?.map(favorito => (
                <CardFavoritos
                  key={favorito.id}
                  favorito={favorito}
                  navigation={navigation}
                  deleteFavorite={withConfirmationDialog(() =>
                    deleteFavorite(favorito),
                  )}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Esta seguro que desea eliminar el restaurante de sus favoritos?
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
    </SafeAreaView>
  );
};

export default Favoritos;
