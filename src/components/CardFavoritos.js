import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const CardFavoritos = ({favorito, navigation, deleteFavorite}) => {
  //console.log("Card de Favoritos: ",favorito)

  return (
    <>
      {favorito.activo ? (
        <View
          style={{
            backgroundColor: '#F2F1F0',
            alignSelf: 'center',
            marginTop: 10,
            width: '40%',
            height: 260,
            borderRadius: 30,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 35,
              position: 'relative',
            }}>
            <Feather
              name="trash-2"
              style={{
                position: 'absolute',
                color: 'black',
                fontSize: 25,
                marginTop: 5,
                right: 10,
              }}
              onPress={deleteFavorite}
            />
          </View>
          <Pressable
            style={{
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
              alignSelf: 'center',
              width: '100%',
              height: 140,
            }}
            onPress={() =>
              navigation.navigate('DetalleRestaurante', {restaurant})
            }>
            <Image
              style={{
                borderTopRightRadius: 80,
                borderTopLeftRadius: 80,
                borderBottomLeftRadius: 80,
                borderBottomRightRadius: 80,
                alignSelf: 'center',
                width: '100%',
                height: 140,
              }}
              source={{uri: favorito?.restaurante?.imagenes[0]?.imagen}}
            />
          </Pressable>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                top: 10,
                color: 'black',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              {favorito?.restaurante?.nombre}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                color: '#E14852',
                fontWeight: '500',
                flexWrap: 'wrap',
              }}>
              {favorito?.distance}
            </Text>
            <MaterialIcons
              name="menu-book"
              style={{
                color: '#E14852',
                fontSize: 30,
                top: 10,
              }}
              onPress={() =>
                navigation.navigate('VerMenuConsumidor', {restaurant})
              }
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default CardFavoritos;
