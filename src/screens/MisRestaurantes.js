import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  BackHandler,
  ScrollView,
} from 'react-native';
import CardRestaurante from '../components/CardRestaurante';
import { data } from '../data/data'; 

const MisRestaurantes = ({navigation}) => {

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backLogoPressable}
          onPress={() => handleBackButtonClick()}>
          <Image
            style={styles.backLogo}
            source={require('../assets/Icons/back_icon.png')}
          />
        </Pressable>
        <Text style={styles.buttonHeaderScreen}>Mis Restaurantes</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {data.map(restaurante => (
          <CardRestaurante key={restaurante.id} restaurante={restaurante} />
        ))}
      </ScrollView>
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('CrearRestaurante')}>
        <Text style={styles.buttonTextStyle}>Nuevo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ff0000',
    marginVertical: '1%'
  },
  scrollView: {
    width: '100%',
    height: "75%"
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backLogoPressable: {
    marginLeft: 35,
    marginRight: 30,
  },
  backLogo: {
    width: 15,
    height: 15,
  },
  cardImage: {
    top: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: 'center',
    width: '90%',
    height: 150,
  },
  boxContainer: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    alignSelf: 'center',
    top: 10,
    width: '80%',
    height: 200,
    borderRadius: 30,
    marginBottom: 10
  },
  setUpViewButton: {
    bottom: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    width: '80%',
    top: 500,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E14852',
    borderRadius: 30,
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeaderScreen: {
    color: 'black',
    fontWeight: '400',
  },
  buttonHeaderCard: {
    left: 20,
    top: 10,
    color: 'black',
    fontWeight: '400',
  },
  buttonHeaderSignUpTextStyle: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    color: 'black',
    fontWeight: '400',
  },
  buttonTextPressable: {
    position: 'absolute',
    bottom: 10,
    left: 70,
  },
  logo: {
    width: 155,
    height: 157,
  },
});

export default MisRestaurantes;
