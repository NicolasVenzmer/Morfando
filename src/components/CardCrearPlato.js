import React, {useEffect, useState} from 'react';
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

const CardCrearPlato = ({plato, onDelete, onUpdate, categories}) => {
  const [showCategories, setShowCategories] = useState(false);
  const onChangeName = name => {
    onUpdate({...plato, nombre: name});
  };
  const updateCategory = callback => {
    const id = callback()

    onUpdate({...plato, categoria_id: id});
  };
  const onUpdateImages = function (images) {
    //console.log("OnUpdateImages: ", images)
    onUpdate({...plato, imagenes: images});
  };
  const onChangePrice = price => {
    onUpdate({...plato, precio: Number(price)});
  };
  const onChangeIngredients = ingredients => {
    onUpdate({...plato, ingredientes: ingredients});
  };
  const setCheckedCeliacos = bool => {
    onUpdate({...plato, aptoCeliaco: !!bool});
  };
  const setCheckedVeganos = bool => {
    onUpdate({...plato, aptoVegano: !!bool});
  };

  const onAddImage = () => {
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
          imagen: _resultUri.toString(),
          //type: _resultType,
          //name: _resultfileName, // || response.uri.substr(response.uri.lastIndexOf('/') + 1),
        };

        onUpdateImages([...(plato?.imagenes||[]), img]);
      },
    );
  };

  const onDeleteImageFn = image => {
    return function () {
      onUpdateImages(plato?.imagenes?.filter(el => el.imagen !== image.imagen)||[]);
    };
  };

  // useEffect(()=>{
  //   console.log('estas son las wqewqe', plato.imagen[0]);
  //   const imagenRecibida = JSON.stringify({imagen: plato.imagen[0].imagen});
  //     //console.log("useEffect",imagenRecibida.imagen);
      
  //     onUpdateImages([...(plato?.imagenes || []), imagenRecibida]);
  // },[])

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
            borderRadius: 20,
          }}>
          <TextInput
            style={{
              color: 'black',
              alignSelf: 'center',
              height: 50,
              margin: 10,
              padding: 10,
              fontWeight: '300',
              backgroundColor: 'white',
              width: '90%',
            }}
            onChangeText={onChangeName}
            placeholder="Nombre del plato"
            placeholderTextColor="black"
            value={plato.nombre}
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
            schema={{
              label: 'nombre',
              value: 'id',
            }}
            open={showCategories}
            value={plato.categoria_id}
            items={categories}
            setOpen={setShowCategories}
            setValue={updateCategory}
          />
          <TextInput
            style={{
              color: 'black',
              alignSelf: 'center',
              height: 50,
              margin: 10,
              padding: 10,
              fontWeight: '300',
              backgroundColor: 'white',
              width: '90%',
            }}
            onChangeText={onChangePrice}
            keyboardType="numeric"
            placeholder="Precio $$"
            placeholderTextColor="black"
            value={plato.precio.toString()}
          />
          <TextInput
            style={{
              color: 'black',
              alignSelf: 'center',
              height: 50,
              marginBottom: 10,
              padding: 10,
              fontWeight: '300',
              backgroundColor: 'white',
              width: '90%',
            }}
            onChangeText={onChangeIngredients}
            placeholder="Ingredientes / Descripcion del plato"
            placeholderTextColor="black"
            value={plato.ingredientes} // es en plural porque sino no muestra la data que trae existente
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
                status={plato.aptoCeliaco ? 'checked' : 'unchecked'}
                color="blue"
                onPress={() => {
                  setCheckedCeliacos(!plato.aptoCeliaco);
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
                status={plato.aptoVegano ? 'checked' : 'unchecked'}
                color="blue"
                onPress={() => {
                  setCheckedVeganos(!plato.aptoVegano);
                }}
              />
              <Text style={{fontWeight: '300', color: 'black'}}>
                Apto Veganos
              </Text>
            </View>
          </View>
          {!plato?.imagenes?.length ? (
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
              }}>
              <Ionicons
                name="cloud-upload-outline"
                style={{
                  color: 'black',
                  fontSize: 30,
                  right: 10,
                }}
                onPress={onAddImage}
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {plato?.imagenes?.map((image, key) => (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={key}>
                      <Image
                        key={key}
                        source={{uri: image.imagen}}
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
                        onPress={onDeleteImageFn(image)}
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
                    onPress={onAddImage}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </View>
        <Feather
          name="trash-2"
          style={{
            alignSelf: 'flex-end',
            right: 40,
            color: '#E14852',
            marginTop: 5,
            fontSize: 20,
          }}
          onPress={onDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardCrearPlato;
