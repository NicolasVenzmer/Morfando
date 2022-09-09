import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, TextInput} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Dia = ({dia}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [desde, onChangedesde] = useState(false);
  const [hasta, onChangehasta] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.dias}>
      <Text style={styles.textoDias}>{dia.title}</Text>
      <Switch
        style={{left: 5, right: 10}}
        trackColor={{false: '#767577', true: '#E14852'}}
        thumbColor={isEnabled ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <TextInput
        style={{
          backgroundColor: 'white',
          width: 35,
          height: 35,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          fontSize: 10,
        }}
        onChangeText={onChangedesde}
        placeholder="00:00"
        value={desde}
      />
      <Text> - </Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          width: 35,
          height: 35,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          fontSize: 10,
        }}
        onChangeText={onChangehasta}
        placeholder="00:00"
        value={hasta}
      />
      <Ionicons
        name="add"
        style={{
          color: '#E14852',
          left: 5,
          fontSize: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textoDias: {
    color: 'black',
    fontWeight: '400',
  },
  dias: {
    top: 10,
    left: 10,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  uploadImage: {
    backgroundColor: 'rgba(226, 202, 204, 0.26)',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    width: '80%',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ff0000',
    marginVertical: '1%',
  },
  scrollView: {
    width: '100%',
    height: '75%',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    fontWeight: '400',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  direccion: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  horarios: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(226, 202, 204, 0.26)',
    width: '80%',
    height: 200,
    justifyContent: 'flex-start',
  },
  nombre: {
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '80%',
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
    marginBottom: 10,
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
  buttonHeaderScreen: {
    color: 'black',
    fontWeight: '400',
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerHorarios: {
    left: 10,
    top: 5,
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

export default Dia;
