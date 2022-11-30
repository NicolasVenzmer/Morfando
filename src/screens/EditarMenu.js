import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardEditarPlato from '../components/CardEditarPlato';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';
import ModalPoup from '../components/ModalPopUp';
import Helper from '../helper/helper';

const EditarMenu = ({navigation}) => {
  const route = useRoute();
  const [restaurant, setRestaurant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [platosTemp, setPlatosTemp] = useState([]);
  const [platosAEliminar, setPlatosAEliminar] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [platoEditado, setVisiblePlatoEditado] = useState(false);
  const [imageToUpload, setImageToUpload] = useState([]);

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
        const plates = res?.data?.platos?.map(el => ({
          ...el,
          imagenes: el.imagen,
          imagen: undefined,
        }));
        platosActivos = plates.filter(plato => plato.activo === true);
        setPlatosTemp(platosActivos);
      })
      .catch(e => {
        console.log(`Menus GET error ${e}`);
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
  useEffect(getMenus, [restaurant]);

  const editarMenu = async () => {
    setVisiblePlatoEditado(true);
    setIsLoading(true);

    if (Helper.isEmpty(platosAEliminar)) {
      const platos = platosTemp.map(
        ({category, createdAt, updatedAt, imagen, ...keepAttrs}) => keepAttrs,
      );

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

      const resEditedPlates = await Promise.all(
        newPlatos.map(platoAEditar => {
          console.log('Datos editados a enviar al back: ', platoAEditar);

          const EDIT_PLATE_URL = '/plate';
          const res = axios.put(EDIT_PLATE_URL, platoAEditar).catch(e => {
            console.log(`Plate Delete error ${e}`);
          });
          return res;
        }),
      );
      setIsLoading(false);

      console.log(
        'El estado de los platos editados es: ',
        resEditedPlates,
      );
      navigation.navigate('MisRestaurantes');
    } else {
      const resPlatosEliminados = await eliminarMenu();
      console.log(
        'El estado de los platos eliminardos es: ',
        resPlatosEliminados,
      );
      const platos = platosTemp.map(
        ({category, createdAt, updatedAt, imagen, ...keepAttrs}) => keepAttrs,
      );
      console.log('json: ', platos);
      const newPlatos = await Promise.all(
        platos.map(async ({imagenes, ...plato}) => {
          const newImages = await Promise.all(
            imagenes.map(async imagen => {
              //return {imagen: getImageUrl(imagen.imagen, imagen.type, imagen.name)}
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

      const resEditedPlates = await Promise.all(
        newPlatos.map(platoAEditar => {
          console.log('Datos editados a enviar al back: ', platoAEditar);

          const EDIT_PLATE_URL = '/plate';
          const res = axios.put(EDIT_PLATE_URL, platoAEditar).catch(e => {
            console.log(`Plate Delete error ${e}`);
          });
          return res;
        }),
      );
      setIsLoading(false);

      console.log(
        'El estado de los platos editados es: ',
        resEditedPlates,
      );
      navigation.navigate('MisRestaurantes');
    }
    setIsLoading(false);
  };

  const eliminarMenu = async () => {
    console.log('Estos son los platos a eliminar: ', platosAEliminar);
    setIsLoading(true);

    const resDeletedPlates = await Promise.all(
      platosAEliminar.map(platoAEliminar => {
        const sendData = {
          id: platoAEliminar.id,
          restaurante_id: restaurant.id,
          activo: false,
        };
        console.log('Datos editados a enviar al back ELIMINAR: ', sendData);

        const DELETE_PLATE_URL = '/plate';
        const res = axios
          .delete(DELETE_PLATE_URL, {data: sendData})
          .catch(e => {
            console.log(`Plate Delete error ${e}`);
          });
        return res;
      }),
    );
    setIsLoading(false);
    return resDeletedPlates;
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
      setPlatosAEliminar([...platosAEliminar, plato]);
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
          Editar Menu
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
        {!platosTemp?.length > 0 ? (
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
              No hay menus para editar.
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <>
            {platosTemp?.map((plato, index) => (
              <CardEditarPlato
                key={index}
                id={index}
                plato={plato}
                categories={categoryOptions}
                onUpdate={updatePlateFn(plato)}
                onDelete={deletePlatoFn(plato)}
              />
            ))}
          </>
        )}
      </ScrollView>

      <ModalPoup visible={platoEditado}>
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
                editarMenu();
              }
              setVisiblePlatoEditado(false);
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
    </SafeAreaView>
  );
};

export default EditarMenu;
