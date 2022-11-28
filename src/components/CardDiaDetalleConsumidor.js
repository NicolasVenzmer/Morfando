import React, {useState} from 'react';
import {View, Switch, Text, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useEffect} from 'react';

const CardDiaDetalleConsumidor = ({dia}) => {

  var horaDesde = dia.horaDesde.slice(0, -3);
  var horaHasta = dia.horaHasta.slice(0, -3);

  const isOpened = () => {
    if (horaDesde === '00:00' && horaHasta === '00:00') {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    isOpened();
  }, []);

  return (
    <>
      {isEnabled ? (
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '100%',
            height: 40,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                width: 130,
                height: 32,
                fontSize: 15,
                textAlign: 'center',
                color: 'black',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
              }}>
              {dia.dia}
            </Text>
            <Switch
              style={{
                width: 40,
                height: 32,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
              }}
              trackColor={{false: '#929294', true: '#E14852'}}
              thumbColor={isEnabled ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {horaDesde}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                -
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {horaHasta}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '90%',
            height: 40,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                width: 130,
                height: 32,
                fontSize: 15,
                textAlign: 'center',
                color: 'black',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
              }}>
              {dia.dia}
            </Text>
            <Switch
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
              }}
              trackColor={{false: '#929294', true: '#E14852'}}
              thumbColor={isEnabled ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                }}>Cerrado</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default CardDiaDetalleConsumidor;
