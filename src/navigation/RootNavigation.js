import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import CompletarSignUp from '../screens/CompletarSignUp';
import MisRestaurantes from '../screens/MisRestaurantes';
import CrearRestaurante from '../screens/CrearRestaurante';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CrearRestaurante" component={CrearRestaurante} />

        <Stack.Screen name="MisRestaurantes" component={MisRestaurantes} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CompletarSignUp" component={CompletarSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
