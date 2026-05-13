import { View, Text, Image, StyleSheet } from 'react-native';

export default function GameCard({ game }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title}>{game.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#222',
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 10
  },
  title: {
    color: '#fff',
    marginTop: 5,
    fontSize: 16
  }
});