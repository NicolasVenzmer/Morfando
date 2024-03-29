import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import DefaultImageUser from '../assets/Images/default-user-image.png';
import axios from '../api/axios';
const MINUTE_MS = 15000;

const CustomDrawer = props => {
  const {logout, userInfo} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [image, setImage] = useState();
  const [name, setName] = useState();

  // Obtengo los datos de usuario
  const getUserInfo = () => {
    //Enviar los datos al back
    const USER_URL = `/user${userInfo.id}`;
    setIsLoading(true);
    axios
      .get(USER_URL)
      .then(res => {
        setUser(res.data);
        //if (image === '' || image === undefined) return;
        setImage(res.data[0].imagen.imagen);
        setName(res.data[0].nombre);

        //console.log('User Data: ', res.data);
      })
      .catch(e => {
        console.log(`User Data  error ${e}`);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
    const interval = setInterval(() => {
      getUserInfo();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#E14852'}}>
        <View style={{padding: 20, backgroundColor: '#E14852'}}>
          <Image
            source={image ? {uri: image} : DefaultImageUser}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {name}
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'black'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'black',
              }}>
              Cerrar Sesion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
