import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Plato from '../components/Plato';
import {useRoute} from '@react-navigation/native';

const VerMenu = ({navigation}) => {
 const route = useRoute();
  const [menus, setMenus] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);

  useEffect(() => {
    setMenus(route.params.platosTemp);
    if (!!menus) {
      setEmptyMenus(false);
    }
  }, []);

  console.log('Ya cargue los menus: ', menus);

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
          name="menu"
          style={{
            color: 'black',
            position: 'absolute',
            left: 15,
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.popToTop()}
          //onPress={handleResetNavigationPressed()}
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
        {menus.map((plato, index) => (
          <Plato key={index} plato={plato} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerMenu;
