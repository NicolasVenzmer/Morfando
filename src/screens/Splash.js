import * as React from 'react';import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('CrearRestaurante');
    }, 2000);
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white"}}>
      <Image
        style={styles.backLogo}
        source={require('../assets/original_icon.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backLogo: {
    width: 200, 
    height: 200,
  },
});

export default Splash;
