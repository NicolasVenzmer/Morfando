import * as React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUp');
    }, 1500);
    return () => {};
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/original_icon.png')}
      />
    </View>
  );
};

export default Splash;
