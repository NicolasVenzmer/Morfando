import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image} from 'react-native-elements';
import {size} from 'lodash';

export default function CarouselImages({
  images,
  height,
  width,
  activeSlide,
  setActiveSlide,
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
        PlaceholderContent={<ActivityIndicator color="#fff" />}
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
        //onSnapToItem={index => setActiveSlide(index)}
      />
      <MyPagintation data={images} activeSlide={activeSlide} />
    </View>
  );
}

function MyPagintation({data, activeSlide}) {
  return (
    <Pagination
      dotLength={size(data)}
      activeDotIndex={activeSlide}
      containerStyle={styles.containerPagination}
      dotStyle={styles.dotActive}
      inactiveDotStyle={styles.dotInactive}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.6}
    />
  );
}

const styles = StyleSheet.create({
  containerPagination: {
    backgroundColor: 'transparent',
    zindex: 1,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: '#442484',
  },
  dotInactive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 2,
    backgroundColor: '#fff',
  },
});
