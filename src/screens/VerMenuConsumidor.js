import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Plato from '../components/Plato';
import {useRoute} from '@react-navigation/native';

const VerMenuConsumidor = ({navigation}) => {
  const route = useRoute();
  const [menus, setMenus] = useState([]);
  const [emptyMenus, setEmptyMenus] = useState(true);

  useEffect(() => {
    const plates = route.params.restaurant.categorias;
    setMenus(plates);
    if (!!menus) {
      setEmptyMenus(false);
    }
  }, [route.params]);

  console.log('Ya cargue los menus: ', menus);

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
            <View
              style={{
                width: '100%',
              }}>
              {/* {menus.nombre && menus.platos !== [] ():null} */}
              {menus.map(({nombre, platos}, index) => (
                <>
                  <Text
                    key={index}
                    style={{
                      color: 'black',
                      fontWeight: '350',
                      width: '80%',
                      alignSelf: 'center',
                      left: 5,
                      fontSize: 20,
                      marginBottom: 5,
                    }}>
                    {nombre}
                  </Text>
                  {platos?.map((item, i) => (
                    <Plato key={i} plato={item} />
                  ))}
                </>
              ))}
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerMenuConsumidor;
