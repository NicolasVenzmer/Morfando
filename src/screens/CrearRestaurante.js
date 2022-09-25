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
import MoneyChip from '../components/MoneyChip';
import FoodTypeChip from '../components/FoodTypeChip';

const CrearRestaurante = ({navigation}) => {
  const [nombreRestaurante, onChangenombreRestaurante] = useState(false);
  const [direccion, onChangeDireccion] = useState(false);
  const [selectedMoney, setSelectedMoney] = useState(false);

  const onAddMoneyChip = function () {
    console.log('onAddMoneyChip', selectedMoney);
    setSelectedMoney(!selectedMoney);
  };

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
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '80%',
            marginTop: 10,
          }}>
          {MoneyChips.map(money => (
            <MoneyChip
              key={money.id}
              money={money}
              onAddMoneyChip={() => onAddMoneyChip(money.id)}
              selectedMoney={selectedMoney}
            />
          ))}
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
          {FoodTypeChips.map(food => (
            <FoodTypeChip key={food.id} food={food} />
          ))}
        </View>
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
              onPress={addImage}
            />
          </Pressable>
        ) : (
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
