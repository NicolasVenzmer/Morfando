import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';
import CardPlato from '../components/CardPlato';
import {DrawerActions} from '@react-navigation/native';

const VerMenu = ({navigation}) => {
  const onSubmitRestaurant = () => {
    //Enviar los datos al back
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: '1%',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Feather
          name="menu"
          style={{
            color: 'black',
            marginLeft: 35,
            marginRight: 30,
            fontSize: 20,
          }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
          }}>
          Menu
        </Text>
      </View>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default VerMenu;
