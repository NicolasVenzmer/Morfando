import React, {useState} from 'react';
import {View, Switch, Text, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const DiasDeAtencion = ({dia}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //Metodos para poder cargar los dias y horarios
  const [inputs, setInputs] = useState([
    {key: '', dia: dia.title, abiertoDesde: '', abiertoHasta: ''},
  ]);
  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({key: '', dia: dia.title, abiertoDesde: '', abiertoHasta: ''});
    setInputs(_inputs);
  };
  const deleteHandler = key => {
    if (inputs.length > 1) {
      const _inputs = inputs.filter((input, index) => index != key);
      setInputs(_inputs);
    }
  };

  const inputHandlerAbiertoDesde = (abiertoDesde, key) => {
    const _inputs = [...inputs];
    _inputs[key].key = key;
    _inputs[key].abiertoDesde = abiertoDesde;
    setInputs(_inputs);
  };
  const inputHandlerAbiertoHasta = (abiertoHasta, key) => {
    const _inputs = [...inputs];
    _inputs[key].key = key;
    _inputs[key].abiertoHasta = abiertoHasta;
    setInputs(_inputs);
  };

  return (
    <ScrollView vertical>
      {inputs.map((input, key) => (
        <View
          style={{
            top: 10,
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
            {dia.title}
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
            value={input.abiertoDesde}
            onChangeText={abiertoDesde =>
              inputHandlerAbiertoDesde(abiertoDesde, key)
            }
            placeholder="00:00"
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
            value={input.abiertoHasta}
            onChangeText={abiertoHasta =>
              inputHandlerAbiertoHasta(abiertoHasta, key)
            }
            placeholder="00:00"
          />
          <Ionicons
            name="add-circle"
            style={{
              color: '#E14852',
              left: 5,
              top: 5,
              fontSize: 20,
            }}
            onPress={addHandler}
          />
          <Feather
            name="trash-2"
            style={{
              color: '#E14852',
              top: 5,
              left: 10,
              fontSize: 20,
            }}
            onPress={() => deleteHandler(key)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default DiasDeAtencion;
