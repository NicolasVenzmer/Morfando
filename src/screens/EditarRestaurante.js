import React, {useState, useEffect, useContext} from 'react';
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
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';
import {AuthContext} from '../context/AuthContext';

const EditarRestaurante = ({navigation}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  const route = useRoute();
  const [nombreRestaurante, onChangenombreRestaurante] = useState('');
  const [calle, onChangeCalle] = useState('');
  const [numero, onChangeNumero] = useState(null);
  const [localidad, onChangeLocalidad] = useState('');
  const [barrio, onChangeBarrio] = useState('');
  const [provincia, onChangeProvincia] = useState('');
  const [pais, onChangePais] = useState('');
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(false);
  const [selectedMoney4, setSelectedMoney4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rangoPrecio, setRangoPrecio] = useState(null);
  const [restaurant, setRestaurant] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageToUpload, setImageToUpload] = useState([]);

  const editRestaurant = async () => {
    //Enviar los datos al back
    setIsLoading(true);
    setVisible(true);
    const imagesWithUrl = await Promise.all(
      imageToUpload.map(async image => {
        const imagesUrl = await getImageUrl(
          image.imagen,
          image.type,
          image.name,
        );
        return {imagen: imagesUrl};
      }),
    );
    const listaDeTipoDeComida = [];
    value?.forEach(value => {
      listaDeTipoDeComida.push(value);
    });
    const tipoDeComida = listaDeTipoDeComida.toString();
    const sendData = {
      id: restaurant.id,
      nombre: nombreRestaurante,
      usuario_id: userInfo.id,
      cerradoTemporalmente: false,
      tipoDeComida: tipoDeComida,
      rangoPrecio: rangoPrecio,
      calificacion: 1,
      calle: calle,
      numero: Number(numero),
      barrio: barrio,
      localidad: localidad,
      provincia: provincia,
      pais: pais,
      activo: true,
      horas: horarios,
      imagenes: imagesWithUrl,
    };
    console.log('Los datos a enviar son: ', sendData);

    const EDIT_RESTAURANT_URL = '/restaurant';
    if (visible)
      axios
        .put(EDIT_RESTAURANT_URL, sendData)
        .then(res => {
            navigation.navigate('MisRestaurantes', sendData);
          //console.log('Restaurant Edited Data: ', res.data);
        })
        .catch(e => {
          console.log(`Edit restaurant error ${e}`);
        });
    setIsLoading(false);
  };

  const getImageUrl = async (image, type, name) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      type: type,
      name: name,
    });
    formData.append('upload_preset', 'morfando_upload_images');

    const options = {
      method: 'POST',
      body: formData,
      'X-Requested-With': 'XMLHttpRequest',
      'Allow-Control-Allow-Origin': '*',
    };
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drzh7bbzz/image/upload',
      options,
    );
    const payload = await res.json();
    //console.log('payload', payload);
    setIsLoading(false);
    return payload.url;
  };

  useEffect(() => {
    const restaurant = route.params.restaurant;
    //console.log('Estoy en el restaurante: ', restaurant.address);
    onChangenombreRestaurante(restaurant.nombre);
    onChangeCalle(restaurant.calle);
    onChangeNumero(restaurant.numero.toString());
    onChangeLocalidad(restaurant.localidad);
    onChangeBarrio(restaurant.barrio);
    onChangeProvincia(restaurant.provincia);
    onChangePais(restaurant.pais);
    if (restaurant.rangoPrecio === 1) {
      setSelectedMoney1(true);
      setRangoPrecio(1);
    } else if (restaurant.rangoPrecio === 2) {
      setSelectedMoney2(true);
      setRangoPrecio(2);
    } else if (restaurant.rangoPrecio === 3) {
      setSelectedMoney3(true);
      setRangoPrecio(3);
    } else {
      setSelectedMoney4(true);
      setRangoPrecio(4);
    }
    sethorarios(
      restaurant?.horas.map(horario => ({
        dia: horario.dia.toUpperCase(),
        horaDesde: horario.horaDesde.slice(0, -3),
        horaHasta: horario.horaHasta.slice(0, -3),
      })),
    );
    const comidas = restaurant.tipoDeComida.split(',');
    setValue(comidas);
    //console.log("horarios: ", horarios);
    setImages(restaurant.imagenes);
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
        let _resultfileSize = _response.map(a => a.fileSize);
        const img = {
          imagen: _resultUri.toString(),
          type: _resultType.toString(),
          name: _resultfileName.toString(), // || response.uri.substr(response.uri.lastIndexOf('/') + 1),
          size: Number(_resultfileSize.toString()),
        };
        setImageToUpload(prevImages => prevImages.concat(img));
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
      setImageToUpload(_images);
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
      horaDesde: '',
      horaHasta: '',
    })),
  );
  const addHandler = (dia, position) => {
    const _horarios = [...horarios];
    _horarios.splice(position, 0, {
      dia,
      horaDesde: '',
      horaHasta: '',
    });
    sethorarios(_horarios);
  };
  const deleteHandler = key => {
    const copiaDeHorario = horarios;
    console.log(copiaDeHorario);
    const _copiaDeHorario = copiaDeHorario.filter(
      (input, index) => index != key,
    );

    const foundLunes = _copiaDeHorario.filter(
      obj => obj.dia === 'LUNES',
    ).length;
    const foundMartes = _copiaDeHorario.filter(
      obj => obj.dia === 'MARTES',
    ).length;
    const foundMiercoles = _copiaDeHorario.filter(
      obj => obj.dia === 'MIERCOLES',
    ).length;
    const foundJueves = _copiaDeHorario.filter(
      obj => obj.dia === 'JUEVES',
    ).length;
    const foundViernes = _copiaDeHorario.filter(
      obj => obj.dia === 'VIERNES',
    ).length;
    const foundSabado = _copiaDeHorario.filter(
      obj => obj.dia === 'SABADO',
    ).length;
    const foundDomingo = _copiaDeHorario.filter(
      obj => obj.dia === 'DOMINGO',
    ).length;

    console.log(foundDomingo);

    if (
      (foundLunes === 1 || foundLunes > 1) &&
      (foundMartes === 1 || foundMartes > 1) &&
      (foundMiercoles === 1 || foundMiercoles > 1) &&
      (foundJueves === 1 || foundJueves > 1) &&
      (foundViernes === 1 || foundViernes > 1) &&
      (foundSabado === 1 || foundSabado > 1) &&
      (foundDomingo === 1 || foundDomingo > 1)
    ) {
      const _horarios = horarios.filter((input, index) => index != key);
      sethorarios(_horarios);
    }
  };

  const inputHandlerHoraDesde = (horaDesde, key) => {
    //console.log(arguments);
    const _horarios = [...horarios];
    _horarios[key].horaDesde = horaDesde;
    sethorarios(_horarios);
  };
  const inputHandlerHoraHasta = (horaHasta, key) => {
    //console.log(arguments);
    const _horarios = [...horarios];
    _horarios[key].horaHasta = horaHasta;
    sethorarios(_horarios);
  };
  //console.log('horarios: ', horarios);

  //DropDown
  DropDownPicker.setLanguage('ES');
  DropDownPicker.addTranslation('ES', {
    SELECTED_ITEMS_COUNT_TEXT: {
      0: 'Ningun tipo de comida seleccionado',
      1: '(1) tipo de comida seleccionado',
      2: '(2) tipos de comida seleccionads',
      3: '(3) tipos de comida seleccionados',
      // Feel free to add more
      n: '{count} tipo de comida seleccionado',
    },
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
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
        style={{
          width: '100%',
          height: '80%',
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
              color: 'black',
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
            placeholderTextColor="black"
            value={nombreRestaurante}
          />
          <TextInput
            style={{
              color: 'black',
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
            placeholderTextColor="black"
            value={calle}
          />
          <TextInput
            style={{
              color: 'black',
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
            placeholderTextColor="black"
            value={numero}
          />
          <TextInput
            style={{
              color: 'black',
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            keyboardType="numeric"
            onChangeText={onChangeBarrio}
            placeholder="Barrio"
            placeholderTextColor="black"
            value={barrio.toString()}
          />
          <TextInput
            style={{
              color: 'black',
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
            placeholderTextColor="black"
            value={localidad}
          />
          <TextInput
            style={{
              color: 'black',
              height: 40,
              margin: 12,
              padding: 10,
              fontWeight: '400',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '90%',
            }}
            onChangeText={onChangeProvincia}
            placeholder="Provincia"
            placeholderTextColor="black"
            value={provincia}
          />
          <TextInput
            style={{
              color: 'black',
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
            placeholderTextColor="black"
            value={pais}
          />
        </View>
        <View
          style={{
            marginTop: 390,
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
                inputHandlerHoraDesde={inputHandlerHoraDesde}
                inputHandlerHoraHasta={inputHandlerHoraHasta}
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
        {!images?.length > 0 ? (
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
                      source={{uri: image.imagen.toString()}}
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
          dropDownDirection="TOP"
        />
      </View>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: Theme.fonts.LARGE,
              color: Theme.colors.SECONDARY,
            }}>
            Esta seguro que desea editar el restaurante?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1%',
            marginBottom: '1%',
            marginHorizontal: '1%',
          }}>
          <Pressable
            style={{
              alignSelf: 'center',
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              setVisible(false);
            }}>
            <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
              Cancelar
            </Text>
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'center',
              width: '50%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: Theme.colors.PRIMARY,
              borderRadius: 30,
            }}
            onPress={() => {
              {
                editRestaurant();
              }
              setVisible(false);
            }}>
            <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
              Aceptar
            </Text>
          </Pressable>
        </View>
      </ModalPoup>

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
        onPress={() => editRestaurant()}>
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
