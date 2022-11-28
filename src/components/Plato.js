import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const PlatoType = plato => {
  if (!plato.aptoVegano && !plato.aptoCeliaco) return;

  if (plato.aptoVegano && plato.aptoCeliaco)
    return (
      <View
        style={{
          flexDirection: 'row',
          bottom: 0,
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '50%',
          marginRight:10
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            top: 2,
          }}
          source={require('../assets/Icons/icono-vegano.png')}
        />
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../assets/Icons/icono-celiaco.png')}
        />
      </View>
    );

  if (plato.aptoVegano === false)
    return (
      <View
        style={{
          flexDirection: 'row',
          bottom: 0,
          justifyContent: 'flex-end',
          width: '50%',
          heigh: '100%',
          position: 'absolute',
          bottom: 0,
          right: 0,
          marginRight: 10,
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginTop: 5,
            alignSelf: 'flex-end',
          }}
          source={require('../assets/Icons/icono-celiaco.png')}
        />
      </View>
    );

  return (
    <View
      style={{
        flexDirection: 'row',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '50%',
        heigh: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
      }}>
      <Image
        style={{
          width: 30,
          height: 30,
        }}
        source={require('../assets/Icons/icono-vegano.png')}
      />
    </View>
  );
};

const Plato = ({plato}) => {
  const [image, setImage] = useState();
  //console.log("estoy en plato", plato?.imagen[0]?.imagen)
  useEffect(() => {
    setImage(plato?.imagen[0]?.imagen);
  }, []);
  return (
    <>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          borderRadius: 10,
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 1},
          shadowRadius: 10,
          elevation: 2,
          backgroundColor: 'white',
          marginBottom: 10,
          minHeight: 150,
          position: 'relative',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              margin: 5,
              borderRadius: 30,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            source={
              image ? {uri: plato?.imagen[0]?.imagen} : DefaultRestaurantImage
            }
          />
          <View
            style={{
              width: '65%',
              height: 100,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
              }}>
              {plato?.nombre}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontWeight: '250',
                bottom: 0,
                fontSize: 12,
                mrginLeft: 5,
                marginRight: 5,
              }}>
              {plato?.ingredientes}
            </Text>
            <Text
              style={{
                color: 'red',
                fontWeight: '250',
                position: 'absolute',
                bottom: 0,
                mrginLeft: 5,
                marginRight: 5,
              }}>
              {`$${plato.precio}` || 'No disponible'}
            </Text>
            <PlatoType {...plato} />
          </View>
        </View>
      </View>
    </>
    // </View>
  );
};

export default Plato;
