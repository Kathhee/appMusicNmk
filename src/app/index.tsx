// index.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';

export default function Index({ navigation }: any) {
  const categorias = [
    {
      id: 1,
      nome: 'Pop',
      cor: '#E13300',
      imagem:
        'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
    },
    {
      id: 2,
      nome: 'Rock',
      cor: '#7358FF',
      imagem:
        'https://img.magnific.com/vetores-gratis/tipo-de-letra-pirata_1284-47239.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      id: 3,
      nome: 'Funk',
      cor: '#00A86B',
      imagem:
        'https://upload.wikimedia.org/wikipedia/pt/5/57/Funk_Brasil_Especial.jpg',
    },
    {
      id: 4,
      nome: 'Hip Hop',
      cor: '#D84040',
      imagem:
        'https://i.pinimg.com/736x/d9/b8/b4/d9b8b48fc77b01bde11611ba45bbd3a6.jpg',
    },
  ];

  const playlists = [
    {
      id: 1,
      nome: 'Top Hits 2026',
      artista: 'The Weeknd, Drake e mais',
      imagem:
        'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
    },
    {
      id: 2,
      nome: 'Noite Relax',
      artista: 'Lo-fi & Chill',
      imagem:
        'https://i.scdn.co/image/ab67706f00000002d073e656e546e43bc387ad79',
    },
    {
      id: 3,
      nome: 'Trap Internacional',
      artista: 'Travis Scott e mais',
      imagem:
        'https://i.pinimg.com/736x/d9/b8/b4/d9b8b48fc77b01bde11611ba45bbd3a6.jpg',
    },
    {
      id: 4,
      nome: 'Rock Classics',
      artista: 'Queen, Nirvana...',
      imagem:
        'https://img.magnific.com/vetores-gratis/tipo-de-letra-pirata_1284-47239.jpg?semt=ais_hybrid&w=740&q=80',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>O que gostaria de ouvir?</Text>

          {/* PESQUISA */}
          <TextInput
            placeholder="O que você quer ouvir?"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* CATEGORIAS */}
        <Text style={styles.sectionTitle}>
          Explore estilos
        </Text>

        <View style={styles.categoryContainer}>
          {categorias.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryCard,
                { backgroundColor: item.cor },
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryText}>
                {item.nome}
              </Text>

              <Image
                source={{ uri: item.imagem }}
                style={styles.categoryImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* PLAYLISTS */}
        <Text style={styles.sectionTitle}>
          Feito para você
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {playlists.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.playlistCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ListaReproducao')
              }
            >
              <Image
                source={{ uri: item.imagem }}
                style={styles.playlistImage}
              />

              <Text style={styles.playlistTitle}>
                {item.nome}
              </Text>

              <Text style={styles.playlistArtist}>
                {item.artista}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TOCADAS RECENTEMENTE */}
        <Text style={styles.sectionTitle}>
          Tocadas recentemente
        </Text>

        {playlists.map(item => (
          <TouchableOpacity
            key={`recent-${item.id}`}
            style={styles.recentCard}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ListaReproducao')
            }
          >
            <Image
              source={{ uri: item.imagem }}
              style={styles.recentImage}
            />

            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>
                {item.nome}
              </Text>

              <Text style={styles.recentArtist}>
                {item.artista}
              </Text>
            </View>

            <Text style={styles.playButton}>▶</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  scroll: {
    paddingBottom: 40,
  },

  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 55,
    color: '#FFF',
    fontSize: 16,
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 18,
    paddingHorizontal: 20,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  categoryCard: {
    width: '48%',
    height: 110,
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    overflow: 'hidden',
  },

  categoryText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  categoryImage: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 12,
    transform: [{ rotate: '20deg' }],
  },

  playlistCard: {
    width: 170,
    marginLeft: 20,
  },

  playlistImage: {
    width: 170,
    height: 170,
    borderRadius: 18,
  },

  playlistTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },

  playlistArtist: {
    color: '#9E9E9E',
    marginTop: 5,
    fontSize: 14,
  },

  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 18,
    padding: 12,
  },

  recentImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
  },

  recentInfo: {
    flex: 1,
    marginLeft: 15,
  },

  recentTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  recentArtist: {
    color: '#9E9E9E',
    marginTop: 5,
  },

  playButton: {
    color: '#1ED760',
    fontSize: 30,
    fontWeight: 'bold',
  },
});