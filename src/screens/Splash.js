import * as React from 'react';
import {
  View,
  Image,
} from 'react-native';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('CompletarSignUp');
    }, 2000);
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
