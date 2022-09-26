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
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';

const CardPlato = ({navigation}) => {
  const [nombrePlato, onChangeNombrePlato] = useState(false);
  const [precio, onChangePrecio] = useState(false);
  const [ingrediente, onChangeIngrediente] = useState(false);

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: '1%',
        flex: 1,
      }}>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
            <View
              style={{
                marginTop: 10,
                alignSelf: 'center',
                backgroundColor: '#FCC3C3',
                width: '80%',
                minHeight: 120,
                justifyContent: 'flex-start',
              }}>
              <TextInput
                style={{
                  alignSelf: 'center',
                  height: 50,
                  margin: 10,
                  padding: 10,
                  fontWeight: '300',
                  backgroundColor: 'white',
                  width: '90%',
                }}
                onChangeText={onChangeNombrePlato}
                placeholder="Nombre del plato"
                placeholderTextColor="black"
                value={nombrePlato}
              />
              <DropDownPicker
                placeholder="Categoria"
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 0,
                  borderColor: 0,
                }}
                dropDownContainerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
                min={1}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              <TextInput
                style={{
                  alignSelf: 'center',
                  height: 50,
                  margin: 10,
                  padding: 10,
                  fontWeight: '300',
                  backgroundColor: 'white',
                  width: '90%',
                }}
                onChangeText={onChangePrecio}
                placeholder="Precio $$"
                placeholderTextColor="black"
                value={precio}
              />
              <TextInput
                style={{
                  alignSelf: 'center',
                  height: 50,
                  marginBottom: 10,
                  padding: 10,
                  fontWeight: '300',
                  backgroundColor: 'white',
                  width: '90%',
                }}
                onChangeText={onChangeIngrediente}
                placeholder="Ingredientes / Descripcion del plato"
                placeholderTextColor="black"
                value={ingrediente}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    left: 10,
                  }}>
                  <Checkbox
                    status={checkedCeliacos ? 'checked' : 'unchecked'}
                    color="blue"
                    onPress={() => {
                      setCheckedCeliacos(!checkedCeliacos);
                    }}
                  />
                  <Text style={{fontWeight: '300', color: 'black'}}>
                    Apto Celiacos
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    left: 10,
                  }}>
                  <Checkbox
                    status={checkedVeganos ? 'checked' : 'unchecked'}
                    color="blue"
                    onPress={() => {
                      setCheckedVeganos(!checkedVeganos);
                    }}
                  />
                  <Text style={{fontWeight: '300', color: 'black'}}>
                    Apto Veganos
                  </Text>
                </View>
              </View>
              {showImage ? (
                <Pressable
                  style={{
                    backgroundColor: '#EFECEC',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    height: 150,
                    alignItems: 'center',
                    width: '90%',
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
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    height: 140,
                    alignItems: 'center',
                    width: '90%',
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
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
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
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardPlato;
