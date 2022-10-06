import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
};

export default App;

// PARA LEVANTAR LA APLICACION -> npx react-native run-android
