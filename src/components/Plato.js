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
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          marginLeft: 'auto',
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
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          marginLeft: 'auto',
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
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
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
  const [activo, setActivo] = useState();
  useEffect(() => {
    setImage(plato?.imagen[0]?.imagen);
    setActivo(plato.activo);
  }, []);
  return (
    <>
      {activo ? (
        <View
          style={{
            minHeight: 200,
            width: '80%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 10,
            elevation: 2,
            backgroundColor: 'white',
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '100%',
              minHeight: 100,
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 100,
                minHeight: 100,
                margin: 5,
                borderRadius: 30,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              source={{uri: plato?.imagen[0]?.imagen}}
            />
            <View
              style={{
                width: '65%',
                minHeight: 200,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '400',
                  alignSelf: 'flex-start',
                }}>
                {plato?.nombre}
              </Text>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: 'grey',
                  fontWeight: '250',
                  bottom: 0,
                  fontSize: 12,
                  mrginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                }}>
                {plato?.ingredientes}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  marginTop: 5,
                  mrginLeft: 5,
                  marginRight: 10,
                  marginBottom: 5,
                  height: 30,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontWeight: '250',
                    alignSelf: 'flex-start',
                  }}>
                  {`$${plato.precio}` || 'No disponible'}
                </Text>
                <PlatoType {...plato} />
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Plato;
