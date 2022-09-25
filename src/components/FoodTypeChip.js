import React, {useState} from 'react';
import {Chip} from 'react-native-paper';

const FoodTypeChip = ({food}) => {
  const [selectedFood, setSelecteFood] = useState(false);
  return (
    <Chip
      style={{
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 5,
        backgroundColor: 'white',
      }}
      onPress={() => setSelecteFood(!selectedFood)}
      selected={selectedFood}
      selectedColor={selectedFood ? '#E14852' : 'black'}>
      {food.title}
    </Chip>
  );
};

export default FoodTypeChip;
