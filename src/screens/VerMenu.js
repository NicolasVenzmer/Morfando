import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Plato from '../components/Plato';
import {useRoute} from '@react-navigation/native';

const VerMenu = ({navigation}) => {
  const route = useRoute();
  const [menus, setMenus] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);

  useEffect(() => {
    const plates = route.params.restaurant.platos;
    //console.log("plates:", plates)
    setMenus(plates);
    //setMenus(platos)
    if (!!menus) {
      setEmptyMenus(false);
    }
  }, []);

  //console.log('Ya cargue los menus: ', menus);

  const platos = [
    {
      id: 1,
      title: 'Entradas',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
    },
    {
      id: 2,
      title: 'Postre',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      vegano: true,
    },
    {
      id: 3,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 4,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 5,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
    {
      id: 6,
      title: 'Plato Principal',
      nombre: 'Patitas de pollo Rosa Negras',
      descripcion: 'Patitas de pollo , arroz, huevo',
      precio: '$2500',
      image: require('../assets/Images/plato-prueba.jpg'),
      celiaco: true,
      vegano: true,
    },
  ];

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
          onPress={() => navigation.replace('MisRestaurantes')}
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
              El restaurante no tiene menus disponibles
            </Text>
            <Image source={require('../assets/Images/empty-restaurants.png')} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {menus?.map((plato, index) => (
              <Plato key={index} plato={plato} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerMenu;
