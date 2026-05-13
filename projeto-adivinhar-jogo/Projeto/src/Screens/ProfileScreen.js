import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Config/Firebase';
import BackButton from '../components/BackButton';

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: 'Jogador',
    points: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const id = await AsyncStorage.getItem('userId');

    if (!id) {
      setLoading(false);
      return;
    }

    const ref = firebase.database().ref(`users/${id}`);

    ref.on('value', (snap) => {
      const data = snap.val() || {};

      setUser({
        name: data.name || 'Jogador',
        points: data.points || 0,
      });

      setLoading(false);
    });
  }

  function getLevel(points) {
    if (points >= 1000) return '🏆 Lendário';

    if (points >= 700) return '👑 Mestre Supremo';

    if (points >= 500) return '🔥 Mestre';

    if (points >= 300) return '🎯 Profissional';

    if (points >= 200) return '🚀 Aspirante a Profissional';

    if (points >= 120) return '⚔️ Veterano';

    if (points >= 60) return '⭐ Intermediário';

    if (points >= 20) return '🎮 Aprendiz';

    return '🌱 Iniciante';
  }

  function nextLevel(points) {
    if (points < 20) return 20;
    if (points < 60) return 60;
    if (points < 120) return 120;
    if (points < 200) return 200;
    if (points < 300) return 300;
    if (points < 500) return 500;
    if (points < 700) return 700;
    if (points < 1000) return 1000;

    return points;
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#BB86FC" />

        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  const next = nextLevel(user.points);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Perfil do Jogador</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>

        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Nível Atual:</Text>

        <Text style={styles.level}>{getLevel(user.points)}</Text>

        <Text style={styles.label}>Pontuação:</Text>

        <Text style={styles.value}>⭐ {user.points}</Text>

        <Text style={styles.label}>Próximo nível em:</Text>

        <Text style={styles.next}>{next - user.points} pontos</Text>
      </View>

      <BackButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#111',
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
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    color: '#888',
    fontSize: 16,
    marginTop: 12,
  },

  value: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  level: {
    color: '#00ff88',
    fontSize: 24,
    fontWeight: 'bold',
  },

  next: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
