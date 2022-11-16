import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Plato from '../components/Plato';
import {useRoute} from '@react-navigation/native';

const VerMenuConsumidor = ({navigation}) => {
  const route = useRoute();
  const [menus, setMenus] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);
  const [platos, setPlatos] = useState([])

  useEffect(() => {
    const plates = route.params.restaurant.categorias;
    setMenus(plates);
    if (!!menus) {
      setEmptyMenus(false);
    }
  }, [route.params]);

  useEffect(() => {
    const dataList = menus.map(({nombre, platos}) => ({
      nombre: nombre,
      platos: platos,
    }));
    console.log(dataList);
    setPlatos(dataList);
  }, [menus]);

  console.log('Ya cargue los menus: ', menus);

  {
    platos.map((categoria) => (
   console.log(categoria)
            ))
  }

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
          onPress={() => navigation.replace('RestaurantesDisponibles')}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          Menu
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {!menus?.length > 0 ? (
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
              Aun no tiene menus este restaurante.
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <>
            {platos.map((categoria, index) => (
              <Plato key={index} categoria={categoria} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerMenuConsumidor;
