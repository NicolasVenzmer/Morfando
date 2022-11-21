import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardStarRating = ({
  givenWidth,
  givenHeight,
  left,
  onChangeCalificacion,
}) => {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const onChangeNumberOfStars = item => {
    onChangeCalificacion(item);
    setDefaultRating(item);
  };
  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

  return (
    <View
      style={{
        left: left,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => onChangeNumberOfStars(item)}>
            <Image
              style={{
                width: givenWidth,
                height: givenHeight,
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
  );
};

export default CardStarRating;
