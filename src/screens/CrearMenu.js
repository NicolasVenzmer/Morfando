import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import CardCrearPlato from '../components/CardCrearPlato';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';

const CrearMenu = ({navigation}) => {
  const route = useRoute();
  const [nombrePlato, onChangeNombrePlato] = useState(false);
  const [precio, onChangePrecio] = useState(false);
  const [ingrediente, onChangeIngrediente] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [platosTemp, setPlatosTemp] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);

  const getRestaurant = async () => {
    setIsLoading(true);
    const id = restaurant.id;
    const GET_RESTAURANTS_URL = `/restaurant${id}`;
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        const categorias = res.data.categorias;
        setCategorias(categorias);
      })
      .catch(e => {
        console.log(`Restaurant GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log('restaurant', route.params.restaurant);
    const plates = route.params.restaurant.platos;
    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    setPlatosTemp(plates);
    if (!!platosTemp) {
      setEmptyMenus(false);
    }
    getRestaurant();
  }, []);

  const [platos, setPlatos] = useState([{key: '', plato: ''}]);
  const addPlato = () => {
    const _platosTemp = [...platosTemp];
    _platosTemp.push({key: '', plato: ''});
    setPlatosTemp(_platosTemp);
  };
  const deletePlato = key => {
    if (platosTemp.length > 1) {
      const _platosTemp = platosTemp.filter((plato, index) => index != key);
      setPlatosTemp(_platosTemp);
    }
  };

  //Checkbox celiaco o vegetariano
  const [checkedCeliacos, setCheckedCeliacos] = useState(false);
  const [checkedVeganos, setCheckedVeganos] = useState(false);

  const onSubmitRestaurant = () => {
    //Enviar los datos al back
  };

  //Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Entrada', value: 'apple'},
    {label: 'Plato Fuerte', value: 'banana'},
    {label: 'Postre', value: 'banana1'},
    {label: 'Plato Principal', value: 'banana2'},
  ]);

  //Images
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(true);

  const addImage = () => {
    // const options = {
    //   selectionLimit: 1,
    //   mediaType: 'photo',
    //   includeBase64: false,
    // };
    launchImageLibrary(
      {
        height: 100,
        width: 100,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        const _response = response.assets;
        let _resultUri = _response.map(a => a.uri);
        let _resultType = _response.map(a => a.type);
        let _resultfileName = _response.map(a => a.fileName);
        const img = {
          uri: _resultUri,
          type: _resultType,
          name: _resultfileName, // || response.uri.substr(response.uri.lastIndexOf('/') + 1),
        };

        setImages(prevImages => prevImages.concat(img));
      },
    );
    setShowImage(false);
  };

  const deleteImage = key => {
    if (images.length) {
      const _images = images.filter((image, index) => index != key);
      setImages(_images);
    }
    console.log(images.length);
    if (images.length === 1) {
      setShowImage(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons
          name="chevron-back"
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
          Crear Menu
        </Text>
        <Pressable
          style={{
            width: '25%',
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 30,
          }}
          onPress={() => navigation.navigate('CrearCategoria', {restaurant})}>
          <Ionicons
            name="add-circle"
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
            Categoria
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
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
          onPress={() => getRestaurant()}>
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
            Buscar Menus
          </Text>
        </Pressable>
        {emptyMenus ? (
          <>
            {platosTemp?.map((plato, index) => (
              <CardCrearPlato
                key={index}
                plato={plato}
                value={value}
                items={items}
                deletePlato={() => deletePlato(index)}
              />
            ))}
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                left: 30,
                marginBottom: 10,
              }}
              onPress={addPlato}>
              <Ionicons
                name="add-circle"
                style={{
                  color: '#E14852',
                  left: 5,
                  top: 5,
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '300',
                  aligSelf: 'center',
                  left: 10,
                  top: 3,
                }}>
                Agregar plato al menu
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            {platosTemp.map((plato, index) => (
              <CardCrearPlato
                key={index}
                plato={plato}
                deletePlato={() => deletePlato(index)}
              />
            ))}
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                left: 30,
                marginBottom: 10,
              }}
              onPress={addPlato}>
              <Ionicons
                name="add-circle"
                style={{
                  color: '#E14852',
                  left: 5,
                  top: 5,
                  fontSize: 20,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '300',
                  aligSelf: 'center',
                  left: 10,
                  top: 3,
                }}>
                Agregar plato al menu
              </Text>
            </Pressable>
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
        onPress={() => navigation.navigate('VerMenu', {platosTemp})}>
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

export default CrearMenu;
