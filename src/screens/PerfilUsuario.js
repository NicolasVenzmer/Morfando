import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import DefaultImageUser from '../assets/Images/default-user-image.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from '../api/axios';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const PerfilUsuario = ({navigation}) => {
  const {userInfo, logout} = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState(userInfo.nombre);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleUserEdited, setVisibleUserEdited] = useState(false);
  const [visibleDeleteUser, setVisibleDeleteUser] = useState(false);

  const {id, correo, contrasenia, duenio, activo} = userInfo;

  //EN PROCESO A LA ESPERA DEL CAMBIO DEL BACK
  // // Obtengo los datos de usuario
  // const getUserInfo = () => {
  //   //Enviar los datos al back
  //   const USER_URL = `/user${userInfo.id}`;
  //   setIsLoading(true);
  //   axios
  //     .get(USER_URL)
  //     .then(res => {
  //       setUser(res.data);
  //       console.log('User Data: ', res.data);
  //     })
  //     .catch(e => {
  //       console.log(`User Data  error ${e}`);
  //     });
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // // Cambio los datos del usuario
  // const onChangeUserData = () => {
  //   //Enviar los datos al back

  //   const USER_URL = '/user';
  //   setIsLoading(true);
  //   const {...copiaDeUser} = user;
  //   copiaDeUser[0].usuario_imagen.imagen = image.imagen.toString();
  //   setUser({...copiaDeUser});
  //   axios
  //     .put(USER_URL, user)
  //     .then(res => {
  //       console.log('Edited User: ', res.data);
  //     })
  //     .catch(e => {
  //       console.log(`Create mi cuenta error ${e}`);
  //     });
  //   setVisibleUserEdited(true);
  //   setIsLoading(false);
  // };

  // Cambio los datos del usuario
  const onChangeUserData = () => {
    //Enviar los datos al back

    const USER_URL = '/user';
    setIsLoading(true);
    const sendData = {
      id: id,
      nombre: nombreUsuario,
      correo: correo,
      contrasenia: contrasenia,
      imagen: image?.imagen.toString(),
      duenio: duenio,
      activo: activo,
    };
    console.log(sendData);
    axios
      .put(USER_URL, sendData)
      .then(res => {
        console.log('Edited User: ', res.data);
      })
      .catch(e => {
        console.log(`Create mi cuenta error ${e}`);
      });
    setVisibleUserEdited(true);
    setIsLoading(false);
  };

  // Elimino el usuario
  const onDeleteUser = () => {
    //Enviar los datos al back
    setVisibleDeleteUser(true);
    setIsLoading(true);
    const sendData = {
      id: id,
      activo: false,
    };
    if (visibleDeleteUser) {
      axios
        .delete(USER_URL, {sendData: sendData})
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

  //Images
  const [image, setImage] = useState();
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
          imagen: _resultUri.toString(),
          //type: _resultType,
          //name: _resultfileName, // || response.uri.substr(response.uri.lastIndexOf('/') + 1),
        };

        setImage(img);
      },
    );
    setShowImage(false);
  };

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
              source={{uri: image?.imagen?.toString()}}
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
          />
        </View>
      </ScrollView>
      {/* <Pressable
        style={{
          width: '80%',
          height: 20,
          marginBottom: 10,
        }}
        //onPress={() => navigation.navigate('OlvideMiContraseña')}
      >
        <Text style={{color: '#E14852', fontSize: 15, fontWeight: 'bold'}}>
          Cerrar Sesion
        </Text>
      </Pressable> */}
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
          <Text style={{fontSize: 20, color: 'black'}}>Cambios guardados.</Text>
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
              backgroundColor: '#E14852',
              borderRadius: 30,
            }}
            onPress={() => {
              setVisibleUserEdited(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
          </Pressable>
        </View>
      </ModalPoup>

      <ModalPoup visible={visibleDeleteUser}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
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
            <Text style={{color: 'white', textAlign: 'center'}}>Cancelar</Text>
          </Pressable>
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
              {
                onDeleteUser();
              }
              setVisibleDeleteUser(false);
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Aceptar</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#F7F4F4',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalContainer2: {
    width: '80%',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default PerfilUsuario;
