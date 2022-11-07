import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiasDeAtencion from '../components/DiasDeAtencion';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {Chip} from 'react-native-paper';
import axios from '../api/axios';
import {useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const RESTAURANT_URL = '/restaurant';

const EditarRestaurante = ({navigation}) => {
  const route = useRoute();
  const [nombreRestaurante, onChangenombreRestaurante] = useState("");
  const [calle, onChangeCalle] = useState('');
  const [numero, onChangeNumero] = useState('');
  const [localidad, onChangeLocalidad] = useState('');
  const [pais, onChangePais] = useState('');
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(false);
  const [selectedMoney4, setSelectedMoney4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rangoPrecio, setRangoPrecio] = useState(1);
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    const restaurant = route.params.restaurant;
    console.log('Estoy en el restaurante: ', restaurant.hour.dia);
    onChangenombreRestaurante(restaurant.nombre)
    onChangeCalle(restaurant.calle)
    onChangeNumero(restaurant.numero)
    onChangeLocalidad(restaurant.localidad)
    onChangePais(restaurant.pais)
    if(restaurant.rangoPrecio === 1){
      setSelectedMoney1(true)
    } else if(restaurant.rangoPrecio === 2){
      setSelectedMoney2(true)
    } else if(restaurant.rangoPrecio === 3){
      setSelectedMoney3(true)
    } else{
      setSelectedMoney4(true)
    }
    sethorarios(
      restaurant.hour.map(horario => ({
        dia: horario.dia,
        abiertoDesde: horario.horaDesde,
        abiertoHasta: horario.horaHasta,
      })),
    );
    
    console.log('horarios despues de carga: ', horarios);
    setRestaurant(restaurant);
  }, []);

  //Seteo el rango de los precios
  const changeSelectedChip = num => {
    if (num === 1) {
      setSelectedMoney1(true);
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false);
      setRangoPrecio(1);
    }
    if (num === 2) {
      setSelectedMoney2(true);
      setSelectedMoney1(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false);
      setRangoPrecio(2);
    }
    if (num === 3) {
      setSelectedMoney3(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney4(false);
      setRangoPrecio(3);
    }
    if (num === 4) {
      setSelectedMoney4(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      setRangoPrecio(4);
    }
  };

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

  //console.log("imagenes", images)

  const deleteImage = key => {
    if (images.length) {
      const _images = images.filter((image, index) => index != key);
      setImages(_images);
    }
    if (images.length === 1) {
      setShowImage(true);
    }
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

  //Metodos para poder cargar los dias y horarios
  const [horarios, sethorarios] = useState(
    listaDeDias.map(dia => ({
      dia: dia.title,
      abiertoDesde: '',
      abiertoHasta: '',
    })),
  );
  const addHandler = (dia, position) => {
    const _horarios = [...horarios];
    _horarios.splice(position, 0, {
      dia,
      abiertoDesde: '',
      abiertoHasta: '',
    });
    sethorarios(_horarios);
  };
  const deleteHandler = key => {
    if (horarios.length > 1) {
      const _horarios = horarios.filter((input, index) => index != key);
      sethorarios(_horarios);
    }
  };

  const inputHandlerAbiertoDesde = (abiertoDesde, key) => {
    //console.log(arguments);
    const _horarios = [...horarios];
    _horarios[key].abiertoDesde = abiertoDesde;
    sethorarios(_horarios);
  };
  const inputHandlerAbiertoHasta = (abiertoHasta, key) => {
    //console.log(arguments);
    const _horarios = [...horarios];
    _horarios[key].abiertoHasta = abiertoHasta;
    sethorarios(_horarios);
  };

  //console.log('Lista: ', horarios);

  //DropDown
  DropDownPicker.setLanguage('ES');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(restaurant?.tipoDeComida);
  const [items, setItems] = useState([
    {
      label: 'Cocina de autor',
      value: 'Cocina de autor',
    },
    {
      label: 'Comida china',
      value: 'Comida china',
    },
    {
      label: 'Cocina general',
      value: 'Cocina general',
    },
    {
      label: 'Comida Mexicana',
      value: 'Comida Mexicana',
    },
    {
      label: 'Comida Peruana',
      value: 'Comida Peruana',
    },
    {
      label: 'Comida Cafeteria',
      value: 'Comida Cafeteria',
    },
  ]);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: '1%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons
          name="chevron-back"
          style={{
            color: 'black',
            position: 'absolute',
            left: 15,
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          Editar Restaurante
        </Text>
      </View>
      <ScrollView
        vertical
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            marginBottom: 10,
            alignSelf: 'center',
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
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangenombreRestaurante}
            placeholder="Nombre Restaurante"
            value={nombreRestaurante}
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangeCalle}
            placeholder="Calle"
            value={calle}
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            keyboardType="numeric"
            onChangeText={onChangeNumero}
            placeholder="Numero"
            value={numero}
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangeLocalidad}
            placeholder="Localidad"
            value={localidad}
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangePais}
            placeholder="Pais"
            value={pais}
          />
        </View>
        <View
          style={{
            marginTop: 260,
            alignSelf: 'center',
            backgroundColor: '#E2CACC',
            width: '80%',
            minHeight: 120,
            justifyContent: 'flex-start',
            borderRadius: 20,
          }}>
          <Text
            style={{
              top: 5,
              color: 'black',
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            Horario de atencion
          </Text>
          <ScrollView vertical>
            {horarios.map((input, index) => (
              <DiasDeAtencion
                key={index}
                id={index}
                input={input}
                addHandler={addHandler}
                deleteHandler={deleteHandler}
                inputHandlerAbiertoDesde={inputHandlerAbiertoDesde}
                inputHandlerAbiertoHasta={inputHandlerAbiertoHasta}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '80%',
            marginTop: 10,
          }}>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            onPress={() => changeSelectedChip(1)}
            selected={selectedMoney1}
            selectedColor={selectedMoney1 ? '#E14852' : '#A3A3A4'}>
            <Text>$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            onPress={() => changeSelectedChip(2)}
            selected={selectedMoney2}
            selectedColor={selectedMoney2 ? '#E14852' : '#A3A3A4'}>
            <Text>$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            onPress={() => changeSelectedChip(3)}
            selected={selectedMoney3}
            selectedColor={selectedMoney3 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            onPress={() => changeSelectedChip(4)}
            selected={selectedMoney4}
            selectedColor={selectedMoney4 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$$</Text>
          </Chip>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: '85%',
            marginTop: 10,
          }}>
          <DropDownPicker
            style={{alignSelf: 'center', width: '95%'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            min={1}
            max={3}
          />
        </View>
        {showImage ? (
          <Pressable
            style={{
              backgroundColor: '#E2CACC',
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
              onPress={addImage}
            />
          </Pressable>
        ) : (
          <View
            style={{
              position: 'relative',
              backgroundColor: '#E2CACC',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
              height: 140,
              alignItems: 'center',
              width: '80%',
              flexWrap: 'wrap',
            }}>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {images.map((image, key) => (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      key={key}
                      source={{uri: image.uri.toString()}}
                      style={{
                        height: 110,
                        width: 100,
                        resizeMode: 'contain',
                      }}
                    />
                    <Feather
                      name="trash-2"
                      style={{
                        color: '#E14852',
                        top: 3,
                        fontSize: 20,
                      }}
                      onPress={() => deleteImage(key)}
                    />
                  </View>
                ))}
                <Ionicons
                  name="add-circle"
                  style={{
                    color: '#E14852',
                    left: 5,
                    fontSize: 50,
                    width: 100,
                    heigh: 100,
                  }}
                  onPress={addImage}
                />
              </View>
            </ScrollView>
          </View>
        )}
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

export default EditarRestaurante;
