import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigation';
import {UserProvider} from './src/context/MorfandoContext';
//import {UserContext} from './src/context/MorfandoContext';

const App = () => {
  return <RootNavigator />;

  // <UserProvider>
  //   <Main></Main>
  // </UserProvider>;
};

// const Main = () => {
//   const {isAuthenticated} = useContext(UserContext);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isAuthenticated && (
//           <>
//             {/* aca usas solo una pantalla, porque el resto van como hijas de las otras */}
//             <Stack.Screen
//               name="Home"
//               options={{headerShown: false}}
//               component={HomeDrawerNavigator}
//             />
//             <Stack.Screen
//               name="DrawerNavigation"
//               component={DrawerNavigation}
//             />
//             <Stack.Screen
//               name="CrearRestaurante"
//               component={CrearRestaurante}
//             />
//             <Stack.Screen name="MisRestaurantes" component={MisRestaurantes} />
//             <Stack.Screen name="CrearMenu" component={CrearMenu} />
//             <Stack.Screen name="VerMenu" component={VerMenu} />
//           </>
//         )}
//         {!isAuthenticated && (
//           <>
//             <Stack.Navigator screenOptions={{headerShown: false}}>
//               <Stack.Screen
//                 name="Splash"
//                 component={Splash}
//                 options={{headerShown: false}}
//               />

//               <Stack.Screen name="SignUp" component={SignUp} />
//               <Stack.Screen
//                 name="CompletarSignUp"
//                 component={CompletarSignUp}
//               />
//               <Stack.Screen name="Login" component={Login} />

//               <Stack.Screen
//                 name="OlvideMiContraseña"
//                 component={OlvideMiContraseña}
//               />
//               <Stack.Screen
//                 name="RestaurarContraseña"
//                 component={RestaurarContraseña}
//               />
//               <Stack.Screen
//                 name="AltaUsuarioConExito"
//                 component={AltaUsuarioConExito}
//               />
//               <Stack.Screen
//                 name="LoginConsumidor"
//                 component={LoginConsumidor}
//               />
//               <Stack.Screen
//                 name="ErrorDeConexion"
//                 component={ErrorDeConexion}
//               />
//               <Stack.Screen
//                 name="ErrorDeServidor"
//                 component={ErrorDeServidor}
//               />
//               <Stack.Screen
//                 name="ErrorDeUsuarioYaRegistrado"
//                 component={ErrorDeUsuarioYaRegistrado}
//               />
//               <Stack.Screen
//                 name="ErrorDeUsuarioOContraseñaIncorrectas"
//                 component={ErrorDeUsuarioOContraseñaIncorrectas}
//               />
//             </Stack.Navigator>
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default App;

// PARA LEVANTAR LA APLICACION -> npx react-native run-android
