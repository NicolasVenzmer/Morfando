import React, {useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import DetalleRestaurante from '../screens/DetalleRestaurante';
import VerMenuConsumidor from '../screens/VerMenuConsumidor';
import Opiniones from '../screens/Opiniones';
import OpinarSobreRestaurante from '../screens/OpinarSobreRestaurante';
import CrearCategoria from '../screens/CrearCategoria';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
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

const FlowDeOwner = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}>
      <Stack.Screen name="MisRestaurantes" component={MisRestaurantes} />
      <Stack.Screen name="CrearRestaurante" component={CrearRestaurante} />
      <Stack.Screen name="CrearMenu" component={CrearMenu} />
      <Stack.Screen name="VerMenu" component={VerMenu} />
      <Stack.Screen name="EditarRestaurante" component={EditarRestaurante} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <Stack.Screen name="CrearCategoria" component={CrearCategoria} />
    </Stack.Navigator>
  );
};

const FlowDeConsumer = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name="RestaurantesDisponibles"
        component={RestaurantesDisponibles}
      />
      <Stack.Screen name="VerMenuConsumidor" component={VerMenuConsumidor} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <Stack.Screen name="DetalleRestaurante" component={DetalleRestaurante} />
      <Stack.Screen name="Opiniones" component={Opiniones} />
      <Stack.Screen
        name="OpinarSobreRestaurante"
        component={OpinarSobreRestaurante}
      />
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
            routeNames: props.state.routeNames.filter(routeName => {
              routeName !== 'HiddenPage1' &&
                routeName !== 'HiddenPage2' &&
                routeName !== 'HiddenPage3';
            }),
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
            component={FlowDeOwner}
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
            component={FlowDeConsumer}
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
