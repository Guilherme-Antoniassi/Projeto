import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Config/Firebase';

export async function getUser() {
  let id = await AsyncStorage.getItem('userId');

  if (!id) {
    id = 'user_' + Date.now();

    await AsyncStorage.setItem('userId', id);

    await firebase.database().ref(`users/${id}`).set({
      name: 'Jogador',
      points: 0
    });
  }

  return id;
}