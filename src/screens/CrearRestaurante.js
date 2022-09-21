import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  BackHandler,
  ScrollView,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DiasDeAtencion from "../components/DiasDeAtencion"

DropDownPicker.setLanguage('ES');

const CrearRestaurante = ({navigation}) => {
  const [nombreRestaurante, onChangenombreRestaurante] = useState(false);
  const [direccion, onChangeDireccion] = useState(false);

  //Dias
  const listaDeDias = [
    {
      id: 1,
      title: 'LUNES',
    },
    {
      id: 2,
      title: 'MARTES',
    },
    {
      id: 3,
      title: 'MIERCOLES',
    },
    {
      id: 4,
      title: 'JUEVES',
    },
    {
      id: 5,
      title: 'VIERNES',
    },
    {
      id: 6,
      title: 'SABADO',
    },
    {
      id: 7,
      title: 'DOMINGO',
    },
  ];

  //DropDown Multiple
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Manzana', value: 'banana1'},
    {label: 'Batata', value: 'banana2'},
    {label: 'Banana', value: 'banana3'},
    {label: 'Banana', value: 'banana4'},
  ]);

  //Icono para ir a la pantalla anterior
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
        <Text style={styles.buttonHeaderScreen}>Crear Restaurante</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.nombre}>
          <TextInput
            style={styles.input}
            onChangeText={onChangenombreRestaurante}
            placeholder="Nombre Restaurante"
            value={nombreRestaurante}
          />
        </View>
        <View style={styles.direccion}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeDireccion}
            placeholder="Direccion"
            value={direccion}
          />
          <Entypo
            name="location-pin"
            style={{
              color: 'black',
              fontSize: 30,
              marginLeft: 'auto',
              right: 10,
            }}
          />
        </View>
        <View style={styles.horarios}>
          <Text style={styles.headerHorarios}>Horario de atencion</Text>
          {listaDeDias.map(dia => (
            <DiasDeAtencion key={dia.id} dia={dia} />
          ))}
        </View>
        <DropDownPicker
          placeholder="Tipo de comida"
          style={{width: '80%', marginTop: 10, alignSelf: 'center'}}
          dropDownContainerStyle={{
            width: '80%',
            alignSelf: 'center',
          }}
          multiple={true}
          min={1}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Pressable
          style={styles.uploadImage}
          onPress={() => navigation.navigate('MisRestaurantes')}>
          <Ionicons
            name="cloud-upload-outline"
            style={{
              color: 'black',
              fontSize: 30,
              right: 10,
            }}
          />
        </Pressable>
      </ScrollView>
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('MisRestaurantes')}>
        <Text style={styles.buttonTextStyle}>Guardar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  textoDias: {
    color: 'black',
    fontWeight: '400',
  },
  dias: {
    top: 15,
    left: 10,
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
    height: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    minHeight: 120,
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

export default CrearRestaurante;
