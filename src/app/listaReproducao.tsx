import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCurtidas } from '../components/dados';
import { Footer } from '../components/Footer';

export default function ListaReproducao() {
  const params = useLocalSearchParams();
  
  const { alternarCurtida, verificarSeEstaCurtida, tocarMusica, pausarMusica, isPlaying } = useCurtidas();

  const musicaAtual = {
    id: (params.id as string) || '101', 
    nome: (params.nome as string) || 'Blinding Lights',
    artista: (params.artista as string) || 'The Weeknd',
    imagem: (params.imagem as string) || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80',
    duracao: (params.duracao as string) || '3:22',
    audioUrl: (params.audioUrl as string) || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };

  const isCurtida = verificarSeEstaCurtida(musicaAtual.id);


  const handlePlayPause = () => {
    if (isPlaying) {
      pausarMusica();
    } else {
      tocarMusica(musicaAtual);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.topNavTitle}>Tocando Agora</Text>

        <Image source={{ uri: musicaAtual.imagem }} style={styles.largeCover} />

        <View style={styles.metaRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.trackName}>{musicaAtual.nome}</Text>
            <Text style={styles.artistName}>{musicaAtual.artista}</Text>
          </View>
          <Pressable onPress={() => alternarCurtida(musicaAtual)}>
            <Text style={styles.heartIcon}>{isCurtida ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>

        <View style={styles.controlsRow}>
         
          <Pressable style={styles.controlBtn}>
            <Text style={styles.controlText}>⏮</Text>
          </Pressable>

          
          <Pressable 
            style={styles.playPauseBtn} 
            onPress={handlePlayPause}
          >
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </Pressable>

         
          <Pressable style={styles.controlBtn}>
            <Text style={styles.controlText}>⏭</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Footer ativo="Reproduções" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  scroll: { alignItems: 'center', padding: 25, paddingBottom: 110 },
  topNavTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
  largeCover: { width: 300, height: 300, borderRadius: 20, marginVertical: 30 },
  metaRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 10, marginBottom: 30 },
  titleContainer: { flex: 1 },
  trackName: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  artistName: { color: '#8E8E93', fontSize: 16, marginTop: 5 },
  heartIcon: { fontSize: 26 },
  progressBarBg: { width: '95%', height: 4, backgroundColor: '#222', borderRadius: 2, marginBottom: 40 },
  progressBarFill: { width: '35%', height: '100%', backgroundColor: '#1ED760', borderRadius: 2 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  controlBtn: { padding: 15 },
  controlText: { color: '#FFF', fontSize: 32 },
  playPauseBtn: { backgroundColor: '#1ED760', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 },
  playIcon: { color: '#000', fontSize: 26 },
});