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
  const [restaurant, setRestaurant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [platosTemp, setPlatosTemp] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const getRestaurant = () => {
    if (!restaurant?.id) return;
    setIsLoading(true);
    const id = restaurant.id;
    const GET_RESTAURANTS_URL = `/restaurant${id}`;
    axios
      .get(GET_RESTAURANTS_URL)
      .then(res => {
        const categorias = res.data[0].categorias;
        const dataList = categorias 
        setCategoryOptions(dataList);
      })
      .catch(e => {
        console.log(`Restaurant GET error ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    //console.log('restaurant', route.params.restaurant.categorias);
    if (!route?.params?.restaurant) return;
    const plates = route.params.restaurant.platos;
    const restaurant = route.params.restaurant;
    setRestaurant(restaurant);
    setPlatosTemp(plates);
  }, [route.params]);
  useEffect(getRestaurant, [restaurant]);

  const addPlato = () => {
    const newPlatos = [...platosTemp];
    const id = Date.now()
    newPlatos.push({ 
      id: id,
      categoria_id: null,
      nombre: '',
      ingredientes: '',
      aptoVegano: false,
      aptoCeliaco: false,
      activo: true,
      precio: 0,
      imagenes:  []
    });
    setPlatosTemp(newPlatos);
  };

  const onSubmitRestaurant = () => {
    //Enviar los datos al back
    //Ejemplo de JSON a enviar al back.
    //     {
    //     "restaurante_id": 2,
    //     "platos": [
    //         { "categoria_id": 1, -> el id de la categoria seleccionada por ejempl o "Postre" es id=1
    //         "nombre": "Batido de banana y kiwi",
    //         "ingredientes": "Banana y kiwi",
    //         "aptoVegano": true,
    //         "aptoCeliaco": true,
    //         "activo": true,
    //         "precio": 3,
    //         "imagenes": [
    //             {"imagen": "unaimagen"},
    //             {"imagen": "dosimagen"}
    //             ]
    //         },
    //         { "categoria_id": 1,
    //         "nombre": "Batido de frutilla, banana y kiwi",
    //         "ingredientes": "Banana, frutilla y kiwi",
    //         "aptoVegano": true,
    //         "aptoCeliaco": true,
    //         "activo": true,
    //         "precio": 3,
    //         "imagenes": [
    //             {"imagen": "tresimagen"},
    //             {"imagen": "cuatroimagen"}
    //             ]
    //         }
    //     ]
    // }
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
      console.log('Plato a envar: ', newPlatos);
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
