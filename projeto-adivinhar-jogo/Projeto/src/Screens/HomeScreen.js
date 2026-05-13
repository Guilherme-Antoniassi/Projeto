import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Config/Firebase';
import { getUser } from '../Service/UserService';

export default function HomeScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initUser();
  }, []);

  async function initUser() {
    const id = await getUser();

    setUserId(id);
  }

  useEffect(() => {
    if (!userId) return;

    const ref = firebase.database().ref(`users/${userId}`);

    ref.on('value', (snap) => {
      const data = snap.val() || {};

      setPoints(data.points || 0);
      setLoading(false);
    });

    return () => ref.off();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#BB86FC" />

        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎮</Text>

      <Text style={styles.title}>Adivinhe o Jogo</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Seu perfil</Text>

        <Text style={styles.points}>⭐ {points} pontos</Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.playText}>Jogar Agora</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Ranking')}>
        <Text style={styles.secondaryText}>🏆 Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.secondaryText}>👤 Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.secondaryText}>⚙️ Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#fff',
    marginTop: 15,
    fontSize: 18,
  },

  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  card: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    alignItems: 'center',
  },

  label: {
    color: '#888',
    fontSize: 16,
  },

  points: {
    color: '#BB86FC',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 8,
  },

  playButton: {
    backgroundColor: '#BB86FC',
    width: '90%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
  },

  playText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#2a2a2a',
    width: '90%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  secondaryText: {
    color: '#fff',
    fontSize: 16,
  },
});
