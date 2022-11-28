import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet, TextInput
} from 'react-native';
import CardRestauranteConsumidor from '../components/CardRestauranteConsumidor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import {Searchbar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import GetLocation from 'react-native-get-location';
import CardStarRating from '../components/CardStarRating';
import {Chip} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [visible, setVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [calificacion, setCalificacion] = useState('');
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(false);
  const [selectedMoney4, setSelectedMoney4] = useState(false);
  const [rangoPrecio, setRangoPrecio] = useState(1);
  const [filtroDeDistancia, setFiltroDeDistancia] = useState('');

  const onChangeSearch = query => {
    if (query) {
      const newData = restaurants.filter(restaurant => {
        //console.log('estoy en el searching', restaurant);
        const itemData = restaurant.nombre
          ? restaurant.nombre.toUpperCase()
          : ''.toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchQuery(newData);
    } else {
      setSearchQuery(restaurants);
    }
  };

  DropDownPicker.setLanguage('ES');
  DropDownPicker.addTranslation('ES', {
    SELECTED_ITEMS_COUNT_TEXT: {
      0: 'Ningun tipo de comida seleccionado',
      1: '(1) tipo de comida seleccionado',
      2: '(2) tipos de comida seleccionads',
      3: '(3) tipos de comida seleccionados',
      // Feel free to add more
      n: '{count} tipo de comida seleccionado',
    },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);

  const changeSelectedChip = num => {
    if (num === 1) {
      setSelectedMoney1(true);
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false);
      setRangoPrecio(1);
    }
    if (num === 2) {
      setSelectedMoney2(true);
      setSelectedMoney1(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false);
      setRangoPrecio(2);
    }
    if (num === 3) {
      setSelectedMoney3(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney4(false);
      setRangoPrecio(3);
    }
    if (num === 4) {
      setSelectedMoney4(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      setRangoPrecio(4);
    }
  };

  const onChangeCalificacion = input => {
    console.log('entre', input);
    setCalificacion(input);
  };

  // Obtengo los restaurantes de un owner en especifico
  const getRestaurants = async () => {
    const GET_RESTAURANTS_URL = '/restaurants';
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        //console.log(res.data);
        setRestaurants(res.data);
        setSearchQuery(res.data);
      })
      .catch(e => {
        console.log(`Restaurants GET error ${e}`);
      });
    setLoading(false);
  };

  useEffect(() => {
    getRestaurants();
  }, []);
  useEffect(() => {
    let comidasTemp = [];
    restaurants.map(restaurant => {
      comidasTemp.push(restaurant.tipoDeComida.split(','));
    });
    const comidasTemp2 = [];
    comidasTemp.map(comida => {
      if (comida.length > 1) {
        comida.map(item => {
          const data = item.toString();
          comidasTemp2.push({label: data, value: data});
        });
      } else {
        const data = comida.toString();
        comidasTemp2.push({label: data, value: data});
      }
    });
    let comidasUnicas = [];
    comidasTemp2.map(comida => {
      if (!comidasUnicas.includes(comida.label)) {
        comidasUnicas.push(comida.label);
      }
    });
    let ultimoComidas = [];
    comidasUnicas.map(comida => {
      const data = comida.toString();
      ultimoComidas.push({label: data, value: data});
    });
    setItems(ultimoComidas);
  }, [restaurants]);

  const addFavorite = async restaurant => {
    setLoading(true);
    const ADD_FAVORITE_URL = '/user-favorites';

    const sendData = {
      usuario_id: userInfo.id,
      restaurante_id: restaurant.id,
    };
    //console.log(sendData);
    axios
      .post(ADD_FAVORITE_URL, sendData)
      .then(res => {
        //console.log(res.data);
      })
      .catch(e => {
        console.log(`Favorite GET error ${e}`);
      });
    setVisible(true);
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
            placeholderTextColor="black"
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
                Actualizar Restaurantes
              </Text>
            </Pressable>
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
              {searchQuery?.map(restaurant => (
                <CardRestauranteConsumidor
                  key={restaurant.id}
                  addFavorite={() => addFavorite(restaurant)}
                  restaurant={restaurant}
                  navigation={navigation}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Restaurante agregado a favoritos con exito.
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
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => setVisible(false)}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

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
            <TextInput
              style={{
                color: 'black',
                height: 40,
                marginTop: 10,
                padding: 10,
                fontWeight: '400',
                borderBottomColor: 'grey',
                borderWidth: 1,
                width: '70%',
              }}
              onChangeText={setFiltroDeDistancia}
              placeholder="Cantidad de KM a filtrar..."
              placeholderTextColor="black"
              value={filtroDeDistancia}
            />
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
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 10,
              }}>
              <DropDownPicker
                style={{alignSelf: 'center', width: '100%'}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                dropDownDirection="TOP"
              />
            </View>
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
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '80%',
                marginTop: 10,
              }}>
              <Chip
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  backgroundColor: '#E2CACC',
                }}
                onPress={() => changeSelectedChip(1)}
                selected={selectedMoney1}
                selectedColor={selectedMoney1 ? '#E14852' : '#A3A3A4'}>
                <Text>$</Text>
              </Chip>
              <Chip
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  backgroundColor: '#E2CACC',
                }}
                onPress={() => changeSelectedChip(2)}
                selected={selectedMoney2}
                selectedColor={selectedMoney2 ? '#E14852' : '#A3A3A4'}>
                <Text>$$</Text>
              </Chip>
              <Chip
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  backgroundColor: '#E2CACC',
                }}
                onPress={() => changeSelectedChip(3)}
                selected={selectedMoney3}
                selectedColor={selectedMoney3 ? '#E14852' : '#A3A3A4'}>
                <Text>$$$</Text>
              </Chip>
              <Chip
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  backgroundColor: '#E2CACC',
                }}
                onPress={() => changeSelectedChip(4)}
                selected={selectedMoney4}
                selectedColor={selectedMoney4 ? '#E14852' : '#A3A3A4'}>
                <Text>$$$$</Text>
              </Chip>
            </View>
          </View>
          <View
            style={{width: '100%', marginTop: 20, alignItems: 'flex-start'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                fontFamily: 'Roboto',
                marginBottom: 10,
              }}>
              Cantidad de estrellas
            </Text>
            <CardStarRating
              givenWidth={40}
              givenHeight={40}
              left={0}
              onChangeCalificacion={onChangeCalificacion}
            />
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
