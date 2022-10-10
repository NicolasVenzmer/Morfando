import React, {useState, useEffect} from 'react';
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

const PerfilUsuario = ({navigation}) => {
const [nombreUsuario, setNombreUsuario] = useState('');
  useEffect(() => {
    
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
          name="chevron-back"
          style={{
            position: 'absolute',
            left: 15,
            color: 'black',
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
              style={{marginBottom: 20}}
              size={150}
              source={require('../assets/Icons/error-icon.png')}
            />
            <Pressable
              style={{
                width: '80%',
                height: 20,
                marginBottom: 10,
              }}
              //onPress={() => navigation.navigate('OlvideMiContraseña')}
            >
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
      <Pressable
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
      </Pressable>
      <Pressable
        style={{
          width: '80%',
          height: 20,
          marginBottom: 30,
        }}
        //onPress={() => navigation.navigate('OlvideMiContraseña')}
      >
        <Text style={{color: '#E14852', fontSize: 15, fontWeight: 'bold'}}>
          Dar de baja la cuenta
        </Text>
      </Pressable>
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
        onPress={() => navigation.navigate('CrearRestaurante')}>
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
