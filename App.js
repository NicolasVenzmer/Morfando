import React from 'react';
import RootNavigator from './src/navigation/RootNavigation';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
      <RootNavigator />
  );
};

export default App;

// PARA LEVANTAR LA APLICACION -> npx react-native run-android
