import React, {useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import PerfilUsuario from '../screens/PerfilUsuario';
import Favoritos from '../screens/Favoritos';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CrearMenu from '../screens/CrearMenu';
import VerMenu from '../screens/VerMenu';
import MisRestaurantes from '../screens/MisRestaurantes';
import CrearRestaurante from '../screens/CrearRestaurante';
import {AuthContext} from '../context/AuthContext';
import EditarRestaurante from '../screens/EditarRestaurante';
import RestaurantesDisponibles from '../screens/RestaurantesDisponibles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const FlowDeRestaurante = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        headerShown: false,
      }}>
      <Stack.Screen name="MisRestaurantes" component={MisRestaurantes} />
      <Stack.Screen name="CrearRestaurante" component={CrearRestaurante} />
      <Stack.Screen name="CrearMenu" component={CrearMenu} />
      <Stack.Screen name="VerMenu" component={VerMenu} />
      <Stack.Screen name="EditarRestaurante" component={EditarRestaurante} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
    </Stack.Navigator>
  );
};

const FlowDeRestauranteConsumidor = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name="RestaurantesDisponibles"
        component={RestaurantesDisponibles}
      />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
    </Stack.Navigator>
  );
};

const AppStack = ({navigation}) => {
  const {esDueño} = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName="Mis Restaurantes"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#E14852',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      drawerContent={props => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              // To hide single option
              // (routeName) => routeName !== 'HiddenPage1',
              // To hide multiple options you can add & condition
              routeName => {
                routeName !== 'HiddenPage1' &&
                  routeName !== 'HiddenPage2' &&
                  routeName !== 'HiddenPage3';
              },
            ),
            routes: props.state.routes.filter(
              route =>
                route.name !== 'HiddenPage1' &&
                route.name !== 'HiddenPage2' &&
                route.name !== 'HiddenPage3',
            ),
          },
        };
        return <CustomDrawer {...filteredProps} />;
      }}>
      {esDueño && (
        <>
          <Drawer.Screen
            name="Mis Restaurantes"
            component={FlowDeRestaurante}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="home-outline" size={22} color={color} />
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
          <Drawer.Screen name="HiddenPage3" component={CrearRestaurante} />
          <Drawer.Screen name="HiddenPage1" component={CrearMenu} />
          <Drawer.Screen name="HiddenPage2" component={VerMenu} />
        </>
      )}
      {!esDueño && (
        <>
          <Drawer.Screen
            name="Restaurantes"
            component={FlowDeRestauranteConsumidor}
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
          <Drawer.Screen name="HiddenPage1" component={VerMenu} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AppStack;
