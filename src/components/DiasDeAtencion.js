import React, {useState} from 'react';
import {View, Switch, Text, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const DiasDeAtencion = ({
  dia,
  input,
  addHandler,
  inputHandlerHoraDesde,
  inputHandlerHoraHasta,
  deleteHandler,
  id,
}) => {
  const key = id
  //  "horas": [{"dia": "lunes", "horaDesde": "12:00", "horaHasta": "22:00"},
  //               {"dia": "martes", "horaDesde": "12:00", "horaHasta": "22:00"},
  //               {"dia": "martes", "horaDesde": "10:00", "horaHasta": "11:00"}

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={{
        top: 10,
        marginBottom: 10,
        left: 10,
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Text
        style={{
          width: 65,
          height: 32,
          fontSize: 10,
          textAlign: 'center',
          color: 'black',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
          alignContent: 'center',
        }}>
        {input.dia}
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
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <TextInput
        style={{
          color: 'black',
          backgroundColor: 'white',
          width: 40,
          height: 32,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          fontSize: 10,
          textAlign: 'center',
        }}
        value={input.horaDesde}
        onChangeText={horaDesde => inputHandlerHoraDesde(horaDesde, id)}
        placeholder="00:00"
        placeholderTextColor="black"
      />
      <Text
        style={{
          width: 20,
          fontSize: 20,
          textAlign: 'center',
        }}>
        -
      </Text>
      <TextInput
        style={{
          color: 'black',
          backgroundColor: 'white',
          width: 40,
          height: 32,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          fontSize: 10,
          textAlign: 'center',
        }}
        value={input.horaHasta}
        onChangeText={horaHasta => inputHandlerHoraHasta(horaHasta, id)}
        placeholder="00:00"
        placeholderTextColor="black"
      />
      <Ionicons
        name="add-circle"
        style={{
          color: '#E14852',
          left: 5,
          top: 5,
          fontSize: 20,
        }}
        onPress={() => addHandler(input.dia, id)}
      />
      <Feather
        name="trash-2"
        style={{
          color: '#E14852',
          top: 5,
          left: 10,
          fontSize: 20,
        }}
        onPress={() => deleteHandler(id)}
      />
    </View>
  );
};

export default DiasDeAtencion;
