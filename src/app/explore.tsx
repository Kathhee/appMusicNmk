import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCurtidas } from '../components/dados';
import { Footer } from '../components/Footer';

export default function Explore() {
  const router = useRouter();
  const { listaCurtidas } = useCurtidas();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.mainTitle}>NMK Music</Text>
        <Text style={styles.subtitle}>Explore coleções e dados sincronizados</Text>

        <Pressable onPress={() => router.push('/curtidas')}>
          {({ pressed }) => (
            <View style={[styles.bannerCard, pressed && styles.cardPressed]}>
              <View style={styles.heartContainer}>
                <Text style={styles.heartBig}>❤️</Text>
              </View>
              <View style={styles.bannerInfo}>
                <Text style={styles.bannerTitle}>Músicas Curtidas</Text>
                <Text style={styles.bannerCounter}>
                  {listaCurtidas.length} {listaCurtidas.length === 1 ? 'música favorita' : 'músicas favoritas'}
                </Text>
              </View>
            </View>
          )}
        </Pressable>
      </ScrollView>
      <Footer ativo="Playlist" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  scroll: { padding: 20, paddingBottom: 100 },
  mainTitle: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 20 },
  subtitle: { color: '#8E8E93', fontSize: 16, marginTop: 4, marginBottom: 30 },
  bannerCard: { backgroundColor: '#16161F', borderRadius: 20, overflow: 'hidden' },
  cardPressed: { opacity: 0.5 },
  heartContainer: { backgroundColor: '#7358FF', height: 160, justifyContent: 'center', alignItems: 'center' },
  heartBig: { fontSize: 70 },
  bannerInfo: { padding: 20 },
  bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  bannerCounter: { color: '#8E8E93', fontSize: 14, marginTop: 6 },
});