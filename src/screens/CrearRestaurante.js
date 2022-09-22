import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DiasDeAtencion from '../components/DiasDeAtencion';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';

DropDownPicker.setLanguage('ES');

const CrearRestaurante = ({navigation}) => {
  const [nombreRestaurante, onChangenombreRestaurante] = useState(false);
  const [direccion, onChangeDireccion] = useState(false);

  //Images
  const [pickerResponse, setPickerResponse] = useState([]);
  const [showImage, setShowImage] = useState(true);

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
    setShowImage(!showImage);
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const [images, setImages] = useState([
    //{key: '', uri: ""},
  ]);
  const addHandler = () => {
    const _images = [...images];
    _images.push({key: '', uri: ''});
    setImages(_images);
  };
  const deleteHandler = key => {
    if (images.length >= 1) {
      const _images = images.filter((input, index) => index != key);
      setImages(_images);
      setShowImage(false);
    }
  };

  const inputHandlerNewImage = (uri, key) => {
    const _images = [...images];
    _images[key].key = key;
    _images[key].uri = uri;
    setImages(_images);
  };

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
    {label: 'Apple', value: 'Apple'},
    {label: 'Banana', value: 'Banana'},
    {label: 'Manzana', value: 'Manzana'},
    {label: 'Batata', value: 'Batata'},
    {label: 'Naranja', value: 'Naranja'},
    {label: 'Melon', value: 'Melon'},
  ]);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ff0000',
        marginVertical: '1%',
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
          Crear Restaurante
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '75%',
        }}>
        <View
          style={{
            marginBottom: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '80%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
            }}
            onChangeText={onChangenombreRestaurante}
            placeholder="Nombre Restaurante"
            value={nombreRestaurante}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '80%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
            }}
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
        <View
          style={{
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: 'rgba(226, 202, 204, 0.26)',
            width: '80%',
            minHeight: 120,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              left: 10,
              top: 5,
              color: 'black',
              fontWeight: '400',
            }}>
            Horario de atencion
          </Text>
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
          listMode="SCROLLVIEW"
        />
        {showImage ? (
          <Pressable
            style={{
              backgroundColor: 'rgba(226, 202, 204, 0.26)',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
              height: 50,
              alignItems: 'center',
              width: '80%',
            }}
            onPress={() => navigation.navigate('MisRestaurantes')}>
            <Ionicons
              name="cloud-upload-outline"
              style={{
                color: 'black',
                fontSize: 30,
                right: 10,
              }}
              onPress={openGallery}
            />
          </Pressable>
        ) : (
          uri && (
            <View
              style={{
                position: 'relative',
                backgroundColor: 'rgba(226, 202, 204, 0.26)',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
                height: 140,
                alignItems: 'center',
                width: '80%',
              }}>
              {/* {images.map((image, key) => (
                <> */}
              <Image
                source={{uri}}
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Feather
                  name="trash-2"
                  style={{
                    color: '#E14852',
                    top: 5,
                    fontSize: 20,
                  }}
                  //onPress={() => deleteHandler(key)}
                />
                <Ionicons
                  name="add-circle"
                  style={{
                    color: '#E14852',
                    left: 5,
                    top: 5,
                    fontSize: 20,
                  }}
                  //onPress={addHandler}
                />
              </View>
              {/* </>
              ))} */}
            </View>
          )
        )}
      </ScrollView>
      <Pressable
        style={{
          position: 'absolute',
          width: '80%',
          top: 500,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E14852',
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate('MisRestaurantes')}>
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

export default CrearRestaurante;
