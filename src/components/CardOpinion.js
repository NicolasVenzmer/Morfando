import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardOpinion = ({opinion}) => {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

  useEffect(() => {
    const calificacion = opinion.calificacion;
    setDefaultRating(calificacion);
  }, []);
  return (
    <View
      style={{
        width: '80%',
        height: 100,
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            fontFamily: 'Roboto',
          }}>
          {opinion.usuario}
        </Text>
        <View
          style={{
            left: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={item}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                  }}
                  source={
                    item <= defaultRating
                      ? {uri: starImgFilled}
                      : {uri: starImgCorner}
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={{width: '100%', top: 20}}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 15,
            fontFamily: 'Roboto',
          }}>
          {opinion.comentario}
        </Text>
        <View
          style={{
            backgroundColor: '#E14852',
            width: '100%',
            height: 2,
            top: 10,
            bottom: 0,
          }}
        />
      </View>
    </View>
  );
};

export default CardOpinion;
