
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import BackButton from '../components/BackButton';

export default function ResultScreen({
  route,
  navigation
}) {
  const { result, game } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        {result}
      </Text>

      <Text style={styles.game}>
        🎮 {game.name}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Game')}
      >
        <Text style={styles.buttonText}>
          Próximo Jogo
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

  result: {
    color: '#00ff88',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 15
  },

  game: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 25
  },

  button: {
    backgroundColor: '#00c851',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});