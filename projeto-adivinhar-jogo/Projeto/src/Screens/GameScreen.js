import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import * as Haptics from 'expo-haptics';
import firebase from '../Config/Firebase';
import BackButton from '../components/BackButton';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../Service/UserService';

export default function GameScreen({ navigation }) {
  const [game, setGame] = useState(null);
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(0);
  const [userId, setUserId] = useState(null);



  useEffect(() => {
    startGame();
  }, []);

  async function startGame() {
    const id = await getUser();
    loadGame();
  }

    function loadGame() {
    const games = require('../Data/LocalGames').games;
    const random = games[Math.floor(Math.random() * games.length)];
    setGame(random);
  }

  async function addPoints() {
    if (!userId) return;

    const ref = firebase.database().ref(`users/${userId}`);

    const snap = await ref.once('value');

    const data = snap.val() || {};

    await ref.update({
      points: (data.points || 0) + 10,
    });
  }

  async function playCorrectSound() {
    try {
      const soundSetting = (await AsyncStorage.getItem('sound')) || 'on';

      if (soundSetting === 'off') return;

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Level-Up.mp3')
      );

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function checkAnswer() {
    if (!game) return;

    if (input.trim().toLowerCase() === game.name.toLowerCase()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      addPoints();
      playCorrectSound();

      navigation.navigate('Result', {
        result: 'Acertou!',
        game,
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setInput('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Qual é o jogo?</Text>

      {game?.image && (
        <Image source={{ uri: game.image }} style={styles.image} />
      )}

      <TextInput
        placeholder="Digite o nome..."
        placeholderTextColor="#999"
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Responder</Text>
      </TouchableOpacity>

      <Text style={styles.points}>⭐ Pontos: {points}</Text>

      <BackButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  image: {
    width: 280,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#00c851',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  points: {
    color: '#ffd700',
    fontSize: 20,
    marginTop: 20,
  },

  loading: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#fff',
    fontSize: 22,
  },
});
