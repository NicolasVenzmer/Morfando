import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardCrearPlato from '../components/CardCrearPlato';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';
import ModalPoup from '../components/ModalPopUp';

const CrearMenu = ({navigation}) => {
  const route = useRoute();
  const [restaurant, setRestaurant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [platosTemp, setPlatosTemp] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [platoCreado, setVisiblePlatoCreado] = useState(false);
  const [hayPlatos, setHayPlatos] = useState(false);

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
        setCategoryOptions(dataList);
      })
      .catch(e => {
        console.log(`Restaurant GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  const getMenus = () => {
    if (!restaurant?.id) return;
    setIsLoading(true);
    const id = restaurant.id;
    const GET_MENUS_URL = `/restaurant/${id}/menu`;
    axios
      .get(GET_MENUS_URL)
      .then(res => {
        console.log('menus: ', res.data.platos);
        const plates = res?.data?.platos?.map(el => ({
          ...el,
          imagenes: el.imagen,
          imagen: undefined,
        }));
        //console.log('ACA', plates);
        setPlatosTemp(plates);
        if (plates?.length > 0) {
          setHayPlatos(true);
        }
      })
      .catch(e => {
        console.log(`Menus GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // console.log(
    //   'restaurant',
    //   JSON.stringify(route.params.restaurant.categorias[0].platos),
    // );
    // console.log('id', route.params.restaurant.id);
    if (!route?.params?.restaurant) return;
    // const plates = route?.params?.restaurant?.categorias[0]?.platos?.map(
    //   el => ({
    //     ...el,
    //     imagenes: el.imagen,
    //     imagen: undefined,
    //   }),
    // );
    // if (!route?.params?.restaurant) return;
    // const plates = route.params.restaurant.platos?.map(el => ({
    //   ...el,
    //   imagenes: el.imagen,
    //   imagen: undefined,
    // }));
    //console.log('plates', plates);

    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    //setPlatosTemp(plates);
  }, [route.params]);
  useEffect(getRestaurant, [restaurant]);
  useEffect(getMenus, [restaurant]);

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

  //Enviar los datos al back
  const crearMenu = () => {
    console.log('estoy creando el menu');
    const platos = platosTemp.map(({id, ...keepAttrs}) => keepAttrs);
    const sendData = {
      restaurant_id: restaurant.id,
      platos,
    };
    console.log('Datos a enviar al back: ', sendData);
    const CREATE_PLATE_URL = '/plate';
    axios
      .post(CREATE_PLATE_URL, sendData)
      .then(res => {
        navigation.navigate('MisRestaurantes', {sendData});
        console.log('Plate Created Data: ', res.data);
      })
      .catch(e => {
        console.log(`Plate error ${e}`);
      });
    setVisiblePlatoCreado(true);
    setIsLoading(false);
  };

  const editarMenu = () => {
    setVisiblePlatoCreado(true)
    //console.log('estoy editando el menu', JSON.stringify(platosTemp));
    const platos = platosTemp.map(
      ({
        id,
        category,
        createdAt,
        updatedAt,
        restaurante_id,
        imagen,
        ...keepAttrs
      }) => keepAttrs,
    );
    const sendData = {
      restaurant_id: restaurant.id,
      platos,
    };
    console.log('Datos a enviar al back: ', sendData);
    const EDIT_PLATE_URL = '/plate';
    if (setVisiblePlatoCreado) {
      axios
        .put(EDIT_PLATE_URL, sendData)
        .then(res => {
          navigation.navigate('MisRestaurantes', {sendData});
          console.log('Plate Created Data: ', res.data);
        })
        .catch(e => {
          console.log(`Plate error ${e}`);
        })
        .finally(() => setIsLoading(false));
    }
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
      //console.log('Plato a envar: ', newPlatos);
    };
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
        {hayPlatos ? (
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 20,
              fontFamily: 'Roboto',
            }}>
            Editar Menu
          </Text>
        ) : (
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 20,
              fontFamily: 'Roboto',
            }}>
            Crear Menu
          </Text>
        )}

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
              setVisiblePlatoCreado(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

      {hayPlatos ? (
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
          onPress={() => editarMenu()}>
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
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default CrearMenu;
