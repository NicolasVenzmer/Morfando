import React, {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';
import {Chip} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const DetalleRestaurante = ({navigation}) => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const restaurant = route.params.restaurant;
  const [selectedMoney1, setSelectedMoney1] = useState(false);
  const [selectedMoney2, setSelectedMoney2] = useState(false);
  const [selectedMoney3, setSelectedMoney3] = useState(true );
  const [selectedMoney4, setSelectedMoney4] = useState(false);

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
          name="chevron-back-outline"
          style={{
            color: 'black',
            position: 'absolute',
            left: 15,
            marginRight: 25,
            fontSize: 30,
          }}
          onPress={() => navigation.goBack()}
        />
        <FontAwesome
          name="commenting-o"
          style={{
            color: 'black',
            marginLeft: 'auto',
            right: 40,
            fontSize: 30,
          }}
          onPress={() => navigation.navigate('Opiniones', {restaurant})}
        />
        <Ionicons
          name="share-social"
          style={{
            color: 'black',
            right: 30,
            fontSize: 30,
          }}
          //onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="heart-outline"
          style={{
            color: 'black',
            right: 20,
            fontSize: 30,
          }}
          //onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={{width: '70%', alignSelf: 'center'}}>
          <Image
            style={{
              top: 10,
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
              alignSelf: 'center',
              width: '100%',
              height: 250,
            }}
            resizeMode="contain"
            source={DefaultRestaurantImage}
          />
        </View>
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 15,
            }}
            onPress={() =>
              navigation.navigate('VerMenuConsumidor', {restaurant})
            }>
            Ver Menu
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: '1000',
              fontSize: 25,
            }}>
            {restaurant.nombre}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: '1000',
              fontSize: 15,
            }}>
            Estrellas
          </Text>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 15,
            }}>
            {restaurant.address}
          </Text>
          <Text
            style={{
              color: '#E14852',
              fontWeight: '500',
              fontSize: 20,
            }}>
            0,5 km
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 15,
            }}>
            Cocina general | Cocina de autor
          </Text>
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
            selected={selectedMoney1}
            selectedColor={selectedMoney1 ? '#E14852' : '#A3A3A4'}>
            <Text>$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney2}
            selectedColor={selectedMoney2 ? '#E14852' : '#A3A3A4'}>
            <Text>$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney3}
            selectedColor={selectedMoney3 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$</Text>
          </Chip>
          <Chip
            style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
            selected={selectedMoney4}
            selectedColor={selectedMoney4 ? '#E14852' : '#A3A3A4'}>
            <Text>$$$$</Text>
          </Chip>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalleRestaurante;
