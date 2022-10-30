import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DefaultRestaurantImage from '../assets/Images/default-restaurant-image.png';

const DetalleRestaurante = ({restaurant, navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

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
          //onPress={() => navigation.goBack()}
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
            source={DefaultRestaurantImage}
          />
        </View>
        <View style={{width: '100%', alignSelf: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              flexWrap: 'wrap',
            }}>
            Nombre
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalleRestaurante;
