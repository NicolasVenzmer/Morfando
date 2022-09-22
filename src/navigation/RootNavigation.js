import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import CompletarSignUp from '../screens/CompletarSignUp';
import MisRestaurantes from '../screens/MisRestaurantes';
import CrearRestaurante from '../screens/CrearRestaurante';
import Splash from '../screens/Splash';
import OlvideMiContraseña from '../screens/OlvideMiContraseña';
import RestaurarContraseña from '../screens/RestaurarContraseña';
import AltaUsuarioConExito from '../screens/AltaUsuarioConExito';
import LoginConsumidor from '../screens/LoginConsumidor';
import ErrorDeConexion from "../screens/errorScreens/ErrorDeConexion"
import ErrorDeServidor from '../screens/errorScreens/ErrorDeServidor';
import ErrorDeUsuarioYaRegistrado from '../screens/errorScreens/ErrorDeUsuarioYaRegistrado';
import ErrorDeUsuarioOContraseñaIncorrectas from '../screens/errorScreens/ErrorDeUsuarioOContraseñaIncorrectas';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="CrearRestaurante" component={CrearRestaurante} />
        <Stack.Screen name="MisRestaurantes" component={MisRestaurantes} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CompletarSignUp" component={CompletarSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="OlvideMiContraseña"
          component={OlvideMiContraseña}
        />
        <Stack.Screen
          name="RestaurarContraseña"
          component={RestaurarContraseña}
        />
        <Stack.Screen
          name="AltaUsuarioConExito"
          component={AltaUsuarioConExito}
        />
        <Stack.Screen name="LoginConsumidor" component={LoginConsumidor} />
        <Stack.Screen name="ErrorDeConexion" component={ErrorDeConexion} />
        <Stack.Screen name="ErrorDeServidor" component={ErrorDeServidor} />
        <Stack.Screen
          name="ErrorDeUsuarioYaRegistrado"
          component={ErrorDeUsuarioYaRegistrado}
        />
        <Stack.Screen
          name="ErrorDeUsuarioOContraseñaIncorrectas"
          component={ErrorDeUsuarioOContraseñaIncorrectas}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
