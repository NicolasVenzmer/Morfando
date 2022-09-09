import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const CardRestaurante = ({restaurante}) => {
  return (
    <View style={styles.boxContainer}>
      <View style={{flexDirection: 'row', height: 20}}>
        <Text style={styles.buttonHeaderCard}>{restaurante.title}</Text>
        <Pressable
          style={{
            top: 10,
            left: 150,
            alignSelf: 'flex-end',
          }}
          onPress={''}>
          <Feather name="trash-2" style={{color: '#E14852', fontSize: 20}} />
        </Pressable>
      </View>
      <Image style={styles.cardImage} source={restaurante.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    top: 10,
    width: '80%',
    height: 200,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonHeaderCard: {
    alignSelf: 'flex-start',
    top: 10,
    left: 20,
    color: 'black',
    fontWeight: '400',
  },
  cardImage: {
    top: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: 'center',
    width: '90%',
    height: 150,
  },
});

export default CardRestaurante;
