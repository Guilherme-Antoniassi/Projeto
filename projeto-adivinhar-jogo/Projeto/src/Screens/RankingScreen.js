import React, { useEffect, useState } from 'react';
import firebase from '../Config/Firebase';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import BackButton from '../components/BackButton';

export default function RankingScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.database().ref('users').on('value', snap => {
      const data = snap.val() || {};
      const list = Object.values(data);
      setUsers(list.sort((usuario1, usuario2) => usuario2.points - usuario1.points));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Ranking</Text>

      <ScrollView style={{ width: '100%' }}>
        {users.map((u, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.position}>#{i + 1}</Text>

            <Text style={styles.name}>
              {u.name || 'Jogador'}
            </Text>

            <Text style={styles.points}>
              ⭐ {u.points}
            </Text>
          </View>
        ))}
      </ScrollView>

      <BackButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  position: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold'
  },

  name: {
    color: '#fff',
    fontSize: 18
  },

  points: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold'
  }
});