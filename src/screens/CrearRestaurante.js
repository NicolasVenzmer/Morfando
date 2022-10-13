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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiasDeAtencion from '../components/DiasDeAtencion';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import FoodTypeChip from '../components/FoodTypeChip';
import {Chip} from 'react-native-paper';

import axios from '../api/axios';
const RESTAURANT_URL = '/restaurant';

const CrearRestaurante = ({navigation}) => {
  const [nombreRestaurante, onChangenombreRestaurante] = useState(false);
  const [direccion, onChangeDireccion] = useState(false);
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(false);
  const [selectedMoney4, setSelectedMoney4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  var rangoPrecios = 1;

    
  const onSubmitRestaurant = () => {
    //Enviar los datos al back
    setIsLoading(true);
    axios
      .post(RESTAURANT_URL, {
        nombreRestaurante,
        direccion,
        //aca horarios
        rangoPrecios,
        tipoDeComida,
        images
      })
      .then(res => {
        console.log('User Data: ', res.data);
      })
      .catch(e => {
        console.log(`Create restaurant error ${e}`);
      });
    setIsLoading(false);
  };

  const changeSelectedChip = (num) => {
    if(num === 1){
      setSelectedMoney1(true)
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false)
      rangoPrecios++
    }
    if (num === 2) {
      setSelectedMoney2(true);
      setSelectedMoney1(false);
      setSelectedMoney3(false);
      setSelectedMoney4(false);
      rangoPrecios = 2;
    }
    if (num === 3) {
      setSelectedMoney3(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney4(false);
      rangoPrecios = 3;
    }
    if (num === 4) {
      setSelectedMoney4(true);
      setSelectedMoney1(false);
      setSelectedMoney2(false);
      setSelectedMoney3(false);
      rangoPrecios = 4;
    }
  }
  console.log(rangoPrecios);
  const FoodTypeChips = [
    {
      id: '1',
      title: 'Cocina de autor',
    },
    {
      id: '2',
      title: 'Comida china',
    },
    {
      id: '3',
      title: 'Cocina general',
    },
    {
      id: '4',
      title: 'Comida Mexicana',
    },
    {
      id: '5',
      title: 'Comida Peruana',
    },
    {
      id: '6',
      title: 'Comida Cafeteria',
    },
  ];

  //Money $ $$ $$$ $$$$
  const MoneyChips = [
    {
      id: '1',
      title: '$',
    },
    {
      id: '2',
      title: '$$',
    },
    {
      id: '3',
      title: '$$$',
    },
    {
      id: '4',
      title: '$$$$',
    },
  ];

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
    console.log(images.length);
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
          Crear Restaurante
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
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
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
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
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangeDireccion}
            placeholder="Direccion"
            value={direccion}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: '#E2CACC',
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
          {listaDeDias.map((dia, index) => (
            <DiasDeAtencion key={index} dia={dia} />
          ))}
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
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '85%',
            marginTop: 10,
          }}>
          {FoodTypeChips.map((food, index) => (
            <FoodTypeChip key={index} food={food} />
          ))}
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

export default CrearRestaurante;
