// explore.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default function Explore({ navigation }: any) {
  const playlists = [
    {
      id: 1,
      nome: 'Músicas Curtidas',
      descricao: 'Suas músicas favoritas',
      imagem:
        'https://misc.scdn.co/liked-songs/liked-songs-640.png',
      tela: 'Curtidas',
    },
    {
      id: 2,
      nome: 'Pop Internacional',
      descricao: 'Os maiores hits do momento',
      imagem:
        'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
      tela: 'ListaReproducao',
    },
    {
      id: 3,
      nome: 'Rap & Trap',
      descricao: 'Trap, rap e hip hop',
      imagem:
        'https://i.pinimg.com/736x/d9/b8/b4/d9b8b48fc77b01bde11611ba45bbd3a6.jpg',
      tela: 'ListaReproducao',
    },
    {
      id: 4,
      nome: 'Rock Classics',
      descricao: 'Clássicos do rock mundial',
      imagem:
        'https://img.magnific.com/vetores-gratis/tipo-de-letra-pirata_1284-47239.jpg?semt=ais_hybrid&w=740&q=80',
      tela: 'ListaReproducao',
    },
    {
      id: 5,
      nome: 'Funk Brasil',
      descricao: 'Os funks mais ouvidos',
      imagem:
        'https://upload.wikimedia.org/wikipedia/pt/5/57/Funk_Brasil_Especial.jpg',
      tela: 'ListaReproducao',
    },
    {
      id: 6,
      nome: 'Lo-fi Beats',
      descricao: 'Músicas para relaxar',
      imagem:
        'https://i.scdn.co/image/ab67706f00000002d073e656e546e43bc387ad79',
      tela: 'ListaReproducao',
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>NMK Music</Text>

        <Text style={styles.subTitle}>
          Explore playlists e descubra novas músicas
        </Text>
      </View>

      {/* PLAYLISTS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {playlists.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.playlistCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.tela)}
          >
            {/* IMAGEM */}
            <Image
              source={{ uri: item.imagem }}
              style={styles.playlistImage}
            />

            {/* INFORMAÇÕES */}
            <View style={styles.infoContainer}>
              <Text style={styles.playlistName}>
                {item.nome}
              </Text>

              <Text style={styles.playlistDescription}>
                {item.descricao}
              </Text>
            </View>
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
    paddingTop: 70,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  logo: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  subTitle: {
    color: '#9E9E9E',
    fontSize: 16,
    marginTop: 6,
  },

  scroll: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },

  playlistCard: {
    backgroundColor: '#111',
    borderRadius: 22,
    marginBottom: 20,
    overflow: 'hidden',
  },

  playlistImage: {
    width: '100%',
    height: 180,
  },

  infoContainer: {
    padding: 18,
  },

  playlistName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  playlistDescription: {
    color: '#AFAFAF',
    fontSize: 15,
    marginTop: 8,
  },
});