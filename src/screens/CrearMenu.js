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
const MENUS_URL = '/restaurant/';
import {useRoute} from "@react-navigation/native"

const CrearMenu = ({navigation}) => {
  const route = useRoute()
  const [nombrePlato, onChangeNombrePlato] = useState(false);
  const [precio, onChangePrecio] = useState(false);
  const [ingrediente, onChangeIngrediente] = useState(false);

  const [platosTemp, setPlatosTemp] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);
  
  console.log(
    'Estoy en el crear menu con el restaurante: ',
    route.params.restaurant.id, // ID
    route.params.restaurant.plates.map(
      (
        plato, // NOMBRE DEL PLATO
      ) => console.log(plato.nombre),
    ),
    route.params.restaurant.plates.map(
      (
        plato, // NOMBRE DE LA CATEGORIA
      ) => console.log(plato.category.nombre),
    ),
    //precio
    route.params.restaurant.plates.map(
      (
        plato, // NOMBRE DEL INGREDIENTE
      ) => console.log(plato.ingredientes),
    ),
    route.params.restaurant.plates.map(
      (
        plato, // APTO PARA VEGANOS
      ) => console.log(plato.aptoVegano),
    ),
    route.params.restaurant.plates.map(
      (
        plato, // APTO PARA CELIACOS
      ) => console.log(plato.aptoCeliaco),
    ),
    route.params.restaurant.plates.map(
      (
        plato, // APTO PARA CELIACOS
      ) => console.log(plato.plato_imagen),
    ),
  );

    // const [loading, setLoading] = useState(true);
    // const [emptyMenus, setEmptyMenus] = useState(true);
    // const [menus, setMenus] = useState([]);

    // const getMenus = async () => {
    //   axios
    //     .get(MENUS_URL)
    //     .then(res => {
    //       //console.log('DATA_: ', res.data);
    //       setMenus(res.data);
    //       setEmptyMenus(false);
    //     })
    //     .catch(e => {
    //       console.log(`Menus error ${e}`);
    //     });
    //   setLoading(false);
    // };

    useEffect(() => {
      setPlatosTemp(route.params.restaurant.plates);
      if(!!platosTemp){
        setEmptyMenus(false)
      }
    }, []);

    console.log("Ya cargue los platos: ", platosTemp)

  const [platos, setPlatos] = useState([{key: '', plato: ''}]);
  const addPlato = () => {
    const _platos = [...platos];
    _platos.push({key: '', plato: ''});
    setPlatos(_platos);
  };
  const deletePlato = key => {
    if (platos.length > 1) {
      const _platos = platos.filter((plato, index) => index != key);
      setPlatos(_platos);
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
          justifyContent: 'flex-start',
        }}>
        <Ionicons
          name="chevron-back"
          style={{
            color: 'black',
            marginLeft: 15,
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
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {emptyMenus ? (
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
          </View>
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
            {/* {platos.map((plato, index) => (
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
            </Pressable> */}
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
        onPress={() => navigation.navigate('VerMenu')}>
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
