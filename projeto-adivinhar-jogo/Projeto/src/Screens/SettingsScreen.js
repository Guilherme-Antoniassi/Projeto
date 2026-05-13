

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import BackButton from '../components/BackButton';

export default function SettingsScreen({
  navigation
}) {
  const [sound, setSound] = useState('on');

  useEffect(() => {
    async function loadSettings() {
      const saved =
        await AsyncStorage.getItem('sound');

      if (saved) setSound(saved);
    }

    loadSettings();
  }, []);

  async function toggleSound() {
    const newValue =
      sound === 'on' ? 'off' : 'on';

    await AsyncStorage.setItem(
      'sound',
      newValue
    );

    setSound(newValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ⚙️ Configurações
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          sound === 'on'
            ? styles.on
            : styles.off
        ]}
        onPress={toggleSound}
      >
        <Text style={styles.buttonText}>
          {sound === 'on'
            ? '🔊 Som Ligado'
            : '🔇 Som Desligado'}
        </Text>
      </TouchableOpacity>

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
    padding: 20
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },

  button: {
    width: '85%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  },

  on: {
    backgroundColor: '#00ff88'
  },

  off: {
    backgroundColor: '#ff4444'
  },

  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  }
});