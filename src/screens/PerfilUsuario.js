import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import DefaultImageUser from '../assets/Images/default-user-image.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from '../api/axios';
import ModalPoup from '../components/ModalPopUp';
import Theme from '../assets/fonts/Theme';
import Helper from '../helper/helper';

const PerfilUsuario = ({navigation}) => {
  const {userInfo, logout} = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState(userInfo.nombre);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleUserEdited, setVisibleUserEdited] = useState(false);
  const [visibleDeleteUser, setVisibleDeleteUser] = useState(false);
  const [user, setUser] = useState('');
  const [imageToUpload, setImageToUpload] = useState('');

  const [userNameCopy, setUserNameCopy] = useState('');

  const {id, correo, contrasenia, duenio, activo} = userInfo;

  //Images
  const [image, setImage] = useState();

  const addImage = () => {
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
          name: _resultfileName.toString(),
          size: Number(_resultfileSize.toString()),
        };
        console.log(img);
        setImageToUpload(img);
        setImage(img.imagen);
      },
    );
  };

  // Obtengo los datos de usuario
  const getUserInfo = () => {
    const USER_URL = `/user${userInfo.id}`;
    setIsLoading(true);
    axios
      .get(USER_URL)
      .then(res => {
        setUser(res.data);
        setUserNameCopy(res.data[0].nombre);
        setNombreUsuario(res.data[0].nombre);
        if (image === '' || image === undefined) {
          setImage(res.data[0].imagen.imagen);
        }
        //console.log('User Data: ', res.data[0].nombre);
      })
      .catch(e => {
        console.log(`User Data  error ${e}`);
      });
    setIsLoading(false);
  };

  // Cambio los datos del usuario
  const onChangeUserData = async () => {
    if (Helper.isEmpty(imageToUpload) && nombreUsuario === userNameCopy) {
      console.log('no hay foto');
    } else if (!Helper.isEmpty(imageToUpload)) {
      //console.log('resultado', result);
      const imageURL = await getImageUrl(
        imageToUpload.imagen,
        imageToUpload.type,
        imageToUpload.name,
      );
      const USER_URL = '/user';
      setIsLoading(true);
      const sendData = {
        id: id,
        nombre: nombreUsuario,
        correo: correo,
        contrasenia: contrasenia,
        imagen: imageURL,
        duenio: duenio,
        activo: activo,
      };
      console.log('IMAGEN', sendData);
      await axios
        .put(USER_URL, sendData)
        .then(res => {
          //console.log('Edited User: ', res.data);
        })
        .catch(e => {
          console.log(`Edited error ${e}`);
        });
      setVisibleUserEdited(true);
      setIsLoading(false);
    } else {
      const USER_URL = '/user';
      setIsLoading(true);
      const sendData = {
        id: id,
        nombre: nombreUsuario,
        correo: correo,
        contrasenia: contrasenia,
        imagen: image,
        duenio: duenio,
        activo: activo,
      };
      console.log('IMAGEN', sendData);
      await axios
        .put(USER_URL, sendData)
        .then(res => {
          //console.log('Edited User: ', res.data);
        })
        .catch(e => {
          console.log(`Edited error ${e}`);
        });
      setVisibleUserEdited(true);
      setIsLoading(false);
    }
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
    console.log('payload', payload);
    setIsLoading(false);
    return payload.url;
  };

  // Elimino el usuario
  const onDeleteUser = async () => {
    //Enviar los datos al back
    const DELETE_USER_URL = '/user';
    setVisibleDeleteUser(true);
    setIsLoading(true);
    const sendData = {
      id: userInfo.id,
      activo: false,
    };
    //console.log(sendData);
    if (visibleDeleteUser) {
      axios
        .delete(DELETE_USER_URL, {data: sendData})
        .then(res => {
          logout();
          console.log('Deleted User: ', res.data);
        })
        .catch(e => {
          console.log(`Delete User error ${e}`);
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}>
        <Ionicons
          name="menu"
          style={{
            position: 'absolute',
            left: 15,
            color: 'black',
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.openDrawer()}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          Mi perfil
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '80%',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Avatar.Image
              source={image ? {uri: image} : DefaultImageUser}
              style={{
                marginBottom: 20,
                objectFit: 'fit',
                resizeMode: 'contain',
              }}
              size={150}
            />
            <Pressable
              style={{
                width: '80%',
                height: 20,
                marginBottom: 10,
              }}
              onPress={addImage}>
              <Text
                style={{color: '#E14852', fontSize: 15, fontWeight: 'bold'}}>
                Cambiar foto de perfil
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={{
              color: 'black',
              width: '80%',
              height: 40,
              margin: 5,
              borderRadius: 10,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: {width: 0, height: 1},
              shadowRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              padding: 10,
            }}
            onChangeText={text => setNombreUsuario(text)}
            value={nombreUsuario}
            placeholder="Nombre Usuario"
            placeholderTextColor="black"
          />
        </View>
      </ScrollView>
      <Pressable
        style={{
          width: '80%',
          height: 20,
          marginBottom: 30,
        }}
        onPress={() => onDeleteUser()}>
        <Text style={{color: '#E14852', fontSize: 15, fontWeight: 'bold'}}>
          Dar de baja la cuenta
        </Text>
      </Pressable>

      <ModalPoup visible={visibleUserEdited}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: Theme.fonts.LARGE,
              color: Theme.colors.SECONDARY,
            }}>
            Cambios guardados.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '2%',
              marginHorizontal: '5%',
            }}
          />
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
              width: '100%',
              marginVertical: 10,
              paddingVertical: 10,
              backgroundColor: Theme.colors.PRIMARY,
              borderRadius: 30,
            }}
            onPress={() => {
              setVisibleUserEdited(false);
            }}>
            <Text style={{color: Theme.colors.THIRD, textAlign: 'center'}}>
              Aceptar
            </Text>
          </Pressable>
        </View>
      </ModalPoup>

      <ModalPoup visible={visibleDeleteUser}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: Theme.fonts.LARGE,
              color: Theme.colors.SECONDARY,
            }}>
            Esta seguro que desea eliminar la cuenta?
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
              setVisibleDeleteUser(false);
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
                onDeleteUser();
              }
              setVisibleDeleteUser(false);
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
        onPress={() => onChangeUserData()}>
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

export default PerfilUsuario;
