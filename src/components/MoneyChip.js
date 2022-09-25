import React, {useState} from 'react';
import {Chip} from 'react-native-paper';

const MoneyChip = ({money, onAddMoneyChip, selectedMoney}) => {
  return (
    <Chip
      style={{marginRight: 5, marginLeft: 5, backgroundColor: '#E2CACC'}}
      onPress={onAddMoneyChip}
      selected={selectedMoney}
      selectedColor={selectedMoney ? '#E14852' : '#A3A3A4'}>
      {money.title}
    </Chip>
  );
};

export default MoneyChip;
