import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import CardCrearPlato from '../components/CardCrearPlato';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import CardCategoria from '../components/CardCategoria';
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';

const CrearCategoria = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const route = useRoute();
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [restaurant, setRestaurant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState({ok: () => {}, cancel: () => {}});
  const [categoriaCreada, setVisibleCategoriaCreada] = useState(false);

  const createCategory = () => {
    //Enviar los datos al back
    const sendData = {
      restaurante_id: restaurant.id,
      nombre: categoria,
      activo: true,
    };
    //console.log('Los datos a enviar son: ', sendData);
    //console.log(userToken)
    const CREATE_CATEGORY_URL = '/category';
    axios
      .post(CREATE_CATEGORY_URL, sendData)
      .then(res => {
        //console.log('Category Created Data: ', res.data);
      })
      .catch(e => {
        console.log(`Create category error ${e}`);
      });
    setVisibleCategoriaCreada(true);
    setIsLoading(false);
  };

  const deleteCategory = async category => {
    const sendData = {
      id: category.id,
      restaurante_id: restaurant.id,
      activo: false,
    };
    const DELETE_CATEGORY_URL = '/category';
    console.log('deleteCategory', sendData);
    axios
      .delete(DELETE_CATEGORY_URL, {data: sendData})
      .then(res => {
        const dataDelete = [...categorias];
        const filteredData = dataDelete.filter(el => el.id != category.id);
        setCategorias(filteredData);
      })
      .catch(e => {
        console.log(`Categorias DELETE error ${e}`);
      });
  };

  const getRestaurant = async () => {
    setIsLoading(true);
    const id = restaurant.id;
    const GET_RESTAURANTS_URL = `/restaurant${id}`;
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        const categorias = res.data[0].categorias;
        setCategorias(categorias);
      })
      .catch(e => {
        console.log(`Restaurant GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
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

  useEffect(() => {
    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    getRestaurant();
  }, []);

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
          Crear Categoria
        </Text>
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
            Buscar Categorias
          </Text>
        </Pressable>
        {categorias?.map(categoria => (
          <CardCategoria
            key={categoria.id}
            categoria={categoria}
            deleteCategory={withConfirmationDialog(() =>
              deleteCategory(categoria),
            )}
          />
        ))}
        <TextInput
          style={{
            alignSelf: 'center',
            height: 40,
            margin: 12,
            padding: 10,
            fontWeight: '400',
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            width: '80%',
          }}
          onChangeText={setCategoria}
          placeholder="Nombre de la categoria"
          value={categoria}
        />
      </ScrollView>

      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            Esta seguro que desea eliminar la categoria?
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

      <ModalPoup visible={categoriaCreada}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>Categoria creada.</Text>
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
              setVisibleCategoriaCreada(false);
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
        onPress={() => createCategory()}>
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

export default CrearCategoria;
