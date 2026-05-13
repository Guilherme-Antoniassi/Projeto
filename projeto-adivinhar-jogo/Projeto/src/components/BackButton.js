import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function BackButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={{
     backgroundColor: '#BB86FC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000'
      }}
    >
      <Text style={{ color: '#fff' }}>🏠 Home</Text>
    </TouchableOpacity>
  );
}


