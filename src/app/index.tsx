import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Musica, useCurtidas } from '../components/dados';
import { Footer } from '../components/Footer';

export default function Index() {
  const router = useRouter();
  const { todasAsMusicas } = useCurtidas();
  const [pesquisa, setPesquisa] = useState('');

  const musicasFiltradas = todasAsMusicas.filter(m =>
    m.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    m.artista.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const irParaReproducao = (musica: Musica) => {
    router.push({
      pathname: '/listaReproducao',
      params: { id: musica.id, nome: musica.nome, artista: musica.artista, imagem: musica.imagem, duracao: musica.duracao }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>O que gostaria de ouvir?</Text>
        
        <TextInput
          style={styles.searchBar}
          placeholder="Artistas, músicas ou álbuns..."
          placeholderTextColor="#777"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        <Text style={styles.sectionTitle}>Resultados para si</Text>
        {musicasFiltradas.map((musica) => (
          <Pressable key={musica.id} onPress={() => irParaReproducao(musica)}>
            {({ pressed }) => (
              <View style={[styles.musicRow, pressed && styles.rowPressed]}>
                <Image source={{ uri: musica.imagem }} style={styles.cover} />
                <View style={styles.musicInfo}>
                  <Text style={styles.trackName}>{musica.nome}</Text>
                  <Text style={styles.artistName}>{musica.artista}</Text>
                </View>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <Footer ativo="Início" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  scroll: { padding: 20, paddingBottom: 100 },
  headerTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 15 },
  searchBar: { backgroundColor: '#16161F', color: '#FFF', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 25 },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  musicRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#12121A', padding: 12, borderRadius: 12, marginBottom: 12 },
  rowPressed: { backgroundColor: '#1C1C27', opacity: 0.6 },
  cover: { width: 55, height: 55, borderRadius: 8 },
  musicInfo: { flex: 1, marginLeft: 15 },
  trackName: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  artistName: { color: '#8E8E93', fontSize: 14, marginTop: 3 },
  playIcon: { color: '#1ED760', fontSize: 18, marginRight: 5 },
});