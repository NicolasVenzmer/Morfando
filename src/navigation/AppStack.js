import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PerfilUsuario from '../screens/PerfilUsuario';
import Favoritos from '../screens/Favoritos';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CrearMenu from '../screens/CrearMenu';
import VerMenu from '../screens/VerMenu';
import MisRestaurantes from '../screens/MisRestaurantes';
import CrearRestaurante from '../screens/CrearRestaurante';
import {AuthContext} from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const {esDueño} = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Mis Restaurantes"
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#E14852',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      {esDueño && (
        <>
          <Drawer.Screen
            name="Mis Restaurantes"
            component={MisRestaurantes}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Favoritos"
            component={Favoritos}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="heart-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Mi Cuenta"
            component={PerfilUsuario}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="person-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="CrearRestaurante"
            component={CrearRestaurante}
            options={{
              drawerLabel: () => null,
              title: null,
            }}
          />
          <Drawer.Screen name="CrearMenu" component={CrearMenu} />
          <Drawer.Screen name="VerMenu" component={VerMenu} />
        </>
      )}
      {!esDueño && (
        <>
          <Drawer.Screen name="VerMenu" component={VerMenu} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AppStack;
