import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import CardCrearPlato from '../components/CardCrearPlato';

const CrearMenu = ({navigation}) => {
  const [nombrePlato, onChangeNombrePlato] = useState(false);
  const [precio, onChangePrecio] = useState(false);
  const [ingrediente, onChangeIngrediente] = useState(false);

  const [platos, setPlatos] = useState([{key: '', plato: ''}]);
  const addPlato = () => {
    const _platos = [...platos];
    _platos.push({key: '', plato: ''});
    setPlatos(_platos);
  };
  const deletePlato = key => {
    if (platos.length > 1) {
      const _platos = platos.filter((plato, index) => index != key);
      setPlatos(_platos);
    }
  };

  //Checkbox celiaco o vegetariano
  const [checkedCeliacos, setCheckedCeliacos] = useState(false);
  const [checkedVeganos, setCheckedVeganos] = useState(false);

  const onSubmitRestaurant = () => {
    //Enviar los datos al back
  };

  //Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Entrada', value: 'apple'},
    {label: 'Plato Fuerte', value: 'banana'},
    {label: 'Postre', value: 'banana1'},
    {label: 'Plato Principal', value: 'banana2'},
  ]);

  //Images
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(true);

  const addImage = () => {
    // const options = {
    //   selectionLimit: 1,
    //   mediaType: 'photo',
    //   includeBase64: false,
    // };
    launchImageLibrary(
      {
        height: 100,
        width: 100,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        const _response = response.assets;
        let _resultUri = _response.map(a => a.uri);
        let _resultType = _response.map(a => a.type);
        let _resultfileName = _response.map(a => a.fileName);
        const img = {
          uri: _resultUri,
          type: _resultType,
          name: _resultfileName, // || response.uri.substr(response.uri.lastIndexOf('/') + 1),
        };

        setImages(prevImages => prevImages.concat(img));
      },
    );
    setShowImage(false);
  };

  const deleteImage = key => {
    if (images.length) {
      const _images = images.filter((image, index) => index != key);
      setImages(_images);
    }
    console.log(images.length);
    if (images.length === 1) {
      setShowImage(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Pressable
          style={{
            marginLeft: 35,
            marginRight: 30,
          }}
          onPress={() => navigation.navigate('MisRestaurantes')}>
          <Image
            style={{
              width: 15,
              height: 15,
            }}
            source={require('../assets/Icons/back_icon.png')}
          />
        </Pressable>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
          }}>
          Crear Menu
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {platos.map((plato, index) => (
          <CardCrearPlato
            key={index}
            plato={plato}
            deletePlato={() => deletePlato(index)}
          />
        ))}
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            left: 30,
            marginBottom: 10,
          }}
          onPress={addPlato}>
          <Ionicons
            name="add-circle"
            style={{
              color: '#E14852',
              left: 5,
              top: 5,
              fontSize: 20,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontWeight: '300',
              aligSelf: 'center',
              left: 10,
              top: 3,
            }}>
            Agregar plato al menu
          </Text>
        </Pressable>
      </ScrollView>
      <Pressable
        style={{
          marginTop: 10,
          marginBottom: 10,
          position: 'relative',
          width: '80%',
          bottom: 0,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate('VerMenu')}>
        <Text
          style={{
            color: '#fdfdfd',
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Guardar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CrearMenu;
