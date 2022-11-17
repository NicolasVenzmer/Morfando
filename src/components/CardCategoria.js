import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const CardCategoria = ({categoria, deleteCategory}) => {
  return (
    <>
      {categoria.activo ? (
        <View style={styles.item}>
          <Text style={styles.title}>{categoria.nombre}</Text>
          <Feather
            name="trash-2"
            style={{
              position: 'absolute',
              color: '#E14852',
              fontSize: 19,
              right: 10,
            }}
            onPress={deleteCategory}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    width: '80%',
    top: 10,
    height: 50,
    marginBottom: 10,
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default CardCategoria;
