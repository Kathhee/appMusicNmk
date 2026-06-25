import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCurtidas } from '../components/dados';
import { Footer } from '../components/Footer';

export default function PlaylistCurtidas() {
  const { listaCurtidas, compartilharMusica } = useCurtidas();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.mainTitle}>Músicas Curtidas</Text>

        {listaCurtidas.length === 0 ? (
          <Text style={styles.emptyText}>Você ainda não curtiu nenhuma música.</Text>
        ) : (
          listaCurtidas.map((item) => (
            <View key={item.id} style={styles.musicCard}>
              <Image source={{ uri: item.imagem }} style={styles.coverImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.songTitle}>{item.nome}</Text>
                <Text style={styles.artistName}>{item.artista}</Text>
              </View>
              
              <Pressable 
                onPress={() => compartilharMusica(item)} 
                style={({ pressed }) => [styles.shareButton, pressed && styles.sharePressed]}
              >
                <Text style={styles.shareText}>🔗 Partilhar</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
      <Footer ativo="Curtidas" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  scroll: { padding: 20, paddingBottom: 100 },
  mainTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 25 },
  emptyText: { color: '#555', fontSize: 16, textAlign: 'center', marginTop: 50 },
  musicCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16161F', borderRadius: 14, padding: 12, marginBottom: 15 },
  coverImage: { width: 55, height: 55, borderRadius: 10 },
  infoContainer: { flex: 1, marginLeft: 15 },
  songTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  artistName: { color: '#8E8E93', fontSize: 14, marginTop: 3 },
  shareButton: { backgroundColor: '#2C2C3E', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  sharePressed: { opacity: 0.5 },
  shareText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
});