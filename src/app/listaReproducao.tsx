// listaReproducao.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

const musicas = [
  {
    id: 1,
    musica: 'Blinding Lights',
    cantor: 'The Weeknd',
    tempo: '3:22',
    imagem:
      'https://headlinerhub.com/assets/image-cache/img/articles//crops/Large.4158f089.theweeknd_blinding_lights.ba662fd0.jpg',
  },
  {
    id: 2,
    musica: 'Starboy',
    cantor: 'The Weeknd',
    tempo: '3:50',
    imagem:
      'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
  },
  {
    id: 3,
    musica: 'Save Your Tears',
    cantor: 'The Weeknd',
    tempo: '3:35',
    imagem:
      'https://media.pitchfork.com/photos/5ff49cfc341e3dc1cfe761a5/1:1/w_1000,h_1000,c_limit/The-Weeknd.jpeg',
  },
  {
    id: 4,
    musica: 'Die For You',
    cantor: 'The Weeknd',
    tempo: '4:20',
    imagem:
      'https://i.scdn.co/image/ab67616d0000b273c5716278abba6a103ad13aa7',
  },
];

export default function ListaReproducao() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter(item => item !== id));
    } else {
      setLiked([...liked, id]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {musicas.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.playerCard,
              index === 0 && styles.firstCard,
            ]}
          >
            {/* IMAGEM */}
            <Image
              source={{ uri: item.imagem }}
              style={styles.artistImage}
            />

            {/* INFORMAÇÕES */}
            <View style={styles.musicInfo}>
              <Text style={styles.musicName}>
                {item.musica}
              </Text>

              <Text style={styles.artistName}>
                {item.cantor}
              </Text>

              {/* CONTROLES */}
              <View style={styles.bottomRow}>
                {/* PLAY */}
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>

                {/* TEMPO */}
                <Text style={styles.duration}>
                  {item.tempo}
                </Text>

                {/* ADICIONAR PLAYLIST */}
                <TouchableOpacity style={styles.iconButton}>
                  <Text style={styles.iconText}>＋</Text>
                </TouchableOpacity>

                {/* CURTIR */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => toggleLike(item.id)}
                >
                  <Text
                    style={[
                      styles.heartIcon,
                      liked.includes(item.id) &&
                        styles.heartActive,
                    ]}
                  >
                    ♥
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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

  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  firstCard: {
    marginTop: 90,
  },

  playerCard: {
    width: '100%',
    backgroundColor: '#0B0B0B',
    borderRadius: 25,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },

  musicInfo: {
    flex: 1,
    marginLeft: 18,
    justifyContent: 'center',
  },

  musicName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  artistName: {
    color: '#B3B3B3',
    fontSize: 17,
    marginTop: 6,
    marginBottom: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  playButton: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#00D95F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  playIcon: {
    color: '#FFF',
    fontSize: 24,
    marginLeft: 3,
  },

  duration: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 18,
  },

  iconButton: {
    marginRight: 18,
  },

  iconText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  heartIcon: {
    color: '#FFF',
    fontSize: 24,
  },

  heartActive: {
    color: '#FF2D55',
  },
});