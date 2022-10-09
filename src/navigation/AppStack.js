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

const firstScreenStack = ({navigation}) => {
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
      }}>
      <Stack.Screen
        name="FirstPage"
        component={MisRestaurantes}
        options={{
          title: 'First Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const secondScreenStack = ({navigation}) => {
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
      }}>
      <Stack.Screen
        name="SecondPage"
        component={VerMenu}
        options={{
          title: 'Second Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const thirdScreenStack = ({navigation}) => {
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
      }}>
      <Stack.Screen
        name="HiddenPage1"
        component={PerfilUsuario}
        options={{
          title: 'Hidder Page One', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const fourthScreenStack = ({navigation}) => {
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
      }}>
      <Stack.Screen
        name="HiddenPage2"
        component={CrearMenu}
        options={{
          title: 'Hidden Page Two', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = ({navigation}) => {
  const {esDueño} = useContext(AuthContext);
  return (
    // <Drawer.Navigator
    //   drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Navigator
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
                routeName !== 'HiddenPage1' && routeName !== 'HiddenPage2';
              },
            ),
            routes: props.state.routes.filter(
              route =>
                route.name !== 'HiddenPage1' && route.name !== 'HiddenPage2',
            ),
          },
        };
        return <CustomDrawer {...filteredProps} />;
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
          <Drawer.Screen name="HiddenPage1" component={CrearMenu} />
          <Drawer.Screen name="HiddenPage2" component={VerMenu} />
        </>
      )}
      {!esDueño && (
        <>
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
    // <Drawer.Navigator
    //   drawerContent={props => <CustomDrawer {...props} />}
    //   initialRouteName="Mis Restaurantes"
    //   screenOptions={{
    //     headerShown: true,
    //     drawerActiveBackgroundColor: '#E14852',
    //     drawerActiveTintColor: '#fff',
    //     drawerInactiveTintColor: '#333',
    //     drawerLabelStyle: {
    //       marginLeft: -25,
    //       fontFamily: 'Roboto-Medium',
    //       fontSize: 15,
    //     },
    //   }}>
    //   {esDueño && (
    //     <>
    //       <Drawer.Screen
    //         name="Mis Restaurantes"
    //         component={MisRestaurantes}
    //         options={{
    //           drawerIcon: ({color}) => (
    //             <Ionicons name="home-outline" size={22} color={color} />
    //           ),
    //         }}
    //       />
    //       <Drawer.Screen
    //         name="Favoritos"
    //         component={Favoritos}
    //         options={{
    //           drawerIcon: ({color}) => (
    //             <Ionicons name="heart-outline" size={22} color={color} />
    //           ),
    //         }}
    //       />
    //       <Drawer.Screen
    //         name="Mi Cuenta"
    //         component={PerfilUsuario}
    //         options={{
    //           drawerIcon: ({color}) => (
    //             <Ionicons name="person-outline" size={22} color={color} />
    //           ),
    //         }}
    //       />
    //       <Drawer.Screen
    //         name="CrearRestaurante"
    //         component={CrearRestaurante}
    //         options={{
    //           drawerLabel: () => null,
    //           title: null,
    //         }}
    //       />
    //       <Drawer.Screen name="CrearMenu" component={CrearMenu} />
    //       <Drawer.Screen name="VerMenu" component={VerMenu} />
    //     </>
    //   )}
    //   {!esDueño && (
    //     <>
    //       <Drawer.Screen name="VerMenu" component={VerMenu} />
    //     </>
    //   )}
    // </Drawer.Navigator>
  );
};

export default AppStack;
