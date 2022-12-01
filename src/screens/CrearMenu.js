import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardCrearPlato from '../components/CardCrearPlato';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';
import ModalPoup from '../components/ModalPopUp';
import Helper from '../helper/helper';
import Theme from '../assets/fonts/Theme';

const CrearMenu = ({navigation}) => {
  const route = useRoute();
  const [restaurant, setRestaurant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [platosTemp, setPlatosTemp] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [platoCreado, setVisiblePlatoCreado] = useState(false);
  const [visibleEmpty, setVisibleEmpty] = useState(false);
  const [emptyPlates, setEmptyPlates] = useState(false);

  const getRestaurant = () => {
    if (!restaurant?.id) return;
    setIsLoading(true);
    const id = restaurant.id;
    const GET_RESTAURANTS_URL = `/restaurant${id}`;
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        const categorias = res.data[0].categorias;
        const dataList = categorias;
        categoriaActiva = dataList.filter(categoria => categoria.activo === true);
        setCategoryOptions(categoriaActiva);
        console.log("categorias",categoryOptions)
      })
      .catch(e => {
        console.log(`Restaurant GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!route?.params?.restaurant) return;
    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    const categoriaRecienCreada = route.params.restaurant.categorias;
    if (categoriaRecienCreada) {
      setCategoryOptions([...categoryOptions, categoriaRecienCreada]);
    }
  }, [route.params]);
  useEffect(getRestaurant, [restaurant]);

  const addPlato = () => {
    const newPlatos = [...platosTemp];
    const id = Date.now();
    newPlatos.push({
      id: id,
      categoria_id: null,
      nombre: '',
      ingredientes: '',
      aptoVegano: false,
      aptoCeliaco: false,
      activo: true,
      precio: 0,
      imagenes: [],
    });
    setPlatosTemp(newPlatos);
  };

  const crearMenu = async () => {
    setIsLoading(true);

    const platos = platosTemp.map(({id, ...keepAttrs}) => keepAttrs);
    platos.map(plato => {
      if (
        Helper.isEmpty(plato.categoria_id) ||
        Helper.isEmpty(plato.imagenes) ||
        Helper.isEmpty(plato.ingredientes) ||
        Helper.isEmpty(plato.nombre) ||
        Helper.isEmpty(plato.precio)
      ) {
        setVisibleEmpty(true);
        throw 'exit';
      }
    });

    setVisiblePlatoCreado;
    const newPlatos = await Promise.all(
      platos.map(async ({imagenes, ...plato}) => {
        const newImages = await Promise.all(
          imagenes.map(async imagen => {
            const imageUrl = await getImageUrl(
              imagen.imagen,
              imagen.type,
              imagen.name,
            );

            return {imagen: imageUrl};
          }),
        );
        return {...plato, imagenes: newImages};
      }),
    );

    console.log('Plato procesado: ', newPlatos);

    const sendData = {
      restaurante_id: restaurant.id,
      platos: newPlatos,
    };
    //console.log('Estos son los platos a crear: ', sendData);
    setVisiblePlatoCreado(true);

    const CREATE_PLATE_URL = '/plate';
    axios
      .post(CREATE_PLATE_URL, sendData)
      .then(res => {
        navigation.navigate('MisRestaurantes', {sendData});
        console.log('Plate Created Data: ', res.data);
      })
      .catch(e => {
        console.log(`Plate Post error ${e}`);
      });
    setIsLoading(false);
  };

  const getImageUrl = async (image, type, name) => {
    setIsLoading(true);
    //console.log("entre: ", imagenes)

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      type: type,
      name: name,
    });
    console.log(formData._parts[0].file);
    formData.append('upload_preset', 'morfando_upload_images');
    const options = {
      method: 'POST',
      body: formData,
      'X-Requested-With': 'XMLHttpRequest',
      'Allow-Control-Allow-Origin': '*',
    };
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drzh7bbzz/image/upload',
      options,
    );
    const payload = await res.json();
    setIsLoading(false);
    return payload.url;
  };

  const deletePlatoFn = plato => {
    return function () {
      const filteredPlates = platosTemp.filter(el => el.id !== plato.id);
      setPlatosTemp(filteredPlates);
    };
  };
  const updatePlateFn = plato => {
    return function (newPlate) {
      const index = platosTemp.findIndex(el => el.id === plato.id);
      const newPlatos = [...platosTemp];
      newPlatos[index] = newPlate;
      setPlatosTemp(newPlatos);
    };
  };

  //console.log('Estos son los platos a crear: ', platosTemp);

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
          height: '80%',
        }}>
        {platosTemp?.map((plato, index) => (
          <CardCrearPlato
            key={index}
            id={index}
            plato={plato}
            categories={categoryOptions}
            onUpdate={updatePlateFn(plato)}
            onDelete={deletePlatoFn(plato)}
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
      </ScrollView>

      <ModalPoup visible={platoCreado}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>Menu guardado.</Text>
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
              {
                crearMenu();
              }
              setVisiblePlatoCreado(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>
      <ModalPoup visible={visibleEmpty}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: Theme.fonts.LARGE,
              color: Theme.colors.SECONDARY,
            }}>
            Hay datos sin completar, por favor verificar.
          </Text>
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
              backgroundColor: Theme.colors.PRIMARY,
              borderRadius: 30,
            }}
            onPress={() => {
              setVisibleEmpty(false);
            }}>
            <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
              Aceptar
            </Text>
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
        onPress={() => crearMenu()}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Crear
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CrearMenu;
