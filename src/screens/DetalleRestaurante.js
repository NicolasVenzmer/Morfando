import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';
import {Chip} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import axios from '../api/axios';
import {AuthContext} from '../context/AuthContext';
import CardOpinion from '../components/CardOpinion';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

const DetalleRestaurante = ({navigation}) => {
  const route = useRoute();
  const {userInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [restaurant, setRestaurant] = useState("");
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(false);
  const [selectedMoney4, setSelectedMoney4] = useState(false);
  const [value, setValue] = useState("");
    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const starImgFilled =
      'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
    const starImgCorner =
      'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

  const [imgActive, setImgActive] = useState(0);
  const [images, setImages] = useState([]);

  const onChange = () => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurment.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

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

  useEffect(() => {
    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    const imagesList = route.params.restaurant.imagenes;
    const dataList = imagesList.map(({imagen}) => ({
      imagen: imagen,
    }));
    setImages(dataList);
    if (restaurant.rangoPrecio === 1) {
      setSelectedMoney1(true);
    } else if (restaurant.rangoPrecio === 2) {
      setSelectedMoney2(true);
    } else if (restaurant.rangoPrecio === 3) {
      setSelectedMoney3(true);
    } else {
      setSelectedMoney4(true);
    }
    const comidas = restaurant.tipoDeComida.split(',');
    //const myArray = comidas.split("|");
    setValue(comidas);
    setDefaultRating(restaurant.calificacion);
    console.log(restaurant.calificacion);
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
        <FontAwesome
          name="commenting-o"
          style={{
            color: 'black',
            marginLeft: 'auto',
            right: 40,
            fontSize: 30,
          }}
          onPress={() => navigation.navigate('Opiniones', {restaurant})}
        />
        <Ionicons
          name="share-social"
          style={{
            color: 'black',
            right: 30,
            fontSize: 30,
          }}
          //onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="heart-outline"
          style={{
            color: 'black',
            right: 20,
            fontSize: 30,
          }}
          onPress={() => addFavorite(restaurant)}
        />
      </View>

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

      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={{width: '70%', alignSelf: 'center', alignItems: 'center'}}>
          <View style={styles.wrap}>
            <ScrollView
              onScroll={({nativeEvent}) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}>
              {images.map((e, index) => (
                <Image
                  key={index}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{uri: e.imagen}}
                />
              ))}
            </ScrollView>
            <View style={styles.wrapDot}>
              {images.map((e, index) => (
                <Text
                  key={index}
                  style={imgActive == index ? styles.dotActive : styles.dot}>
                  ●
                </Text>
              ))}
            </View>
          </View>
          {/* <Image
            style={{
              top: 10,
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
              alignSelf: 'center',
              width: '100%',
              height: 250,
            }}
            resizeMode="contain"
            source={DefaultRestaurantImage}
          /> */}
        </View>
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 15,
            }}
            onPress={() =>
              navigation.navigate('VerMenuConsumidor', {restaurant})
            }>
            Ver Menu
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: '1000',
              fontSize: 25,
            }}>
            {restaurant.nombre}
          </Text>
          <View
            style={{
              top: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity activeOpacity={0.7} key={item}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                    }}
                    source={
                      item <= defaultRating
                        ? {uri: starImgFilled}
                        : {uri: starImgCorner}
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {restaurant.address}
          </Text>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 20,
            }}>
            0,5 km
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {value}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '80%',
            marginTop: 10,
          }}>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney1}
            selectedColor={selectedMoney1 ? '#E14852' : '#A3A3A4'}>
            <Text>$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney2}
            selectedColor={selectedMoney2 ? '#E14852' : '#A3A3A4'}>
            <Text>$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney3}
            selectedColor={selectedMoney3 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney4}
            selectedColor={selectedMoney4 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$$</Text>
          </Chip>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    top: 10,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignSelf: 'center',
    width: '100%',
    height: 250,
  },
  wrapDot: {
    alignSelf: "center",
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'grey',
  },
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

export default DetalleRestaurante;
