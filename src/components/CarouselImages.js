import {View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {Image} from 'react-native-elements';

export default function CarouselImages({
  images,
  height,
  width,
}) {
  const renderItem = ({item}) => {
    return (
      <Image
        style={{
          width: width,
          height,
          borderTopRightRadius: 80,
          borderTopLeftRadius: 80,
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,
        }}
        source={{uri: item.imagen}}
      />
    );
  };
  return (
    <View>
      <Carousel
        layout={'tinder'}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        itemHeight={height}
        renderItem={renderItem}
      />
    </View>
  );
}
