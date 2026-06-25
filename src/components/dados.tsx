import { Audio } from 'expo-av';
import React, { createContext, useContext, useState } from 'react';
import { Platform, Share } from 'react-native'; // Adicione 'Share' aqui

export interface Musica {
  id: string;
  nome: string;
  artista: string;
  imagem: string;
  duracao: string;
  audioUrl?: string; // O '?' torna opcional, resolvendo o erro
}

interface CurtidasContextType {
  todasAsMusicas: Musica[];
  listaCurtidas: Musica[];
  alternarCurtida: (musica: Musica) => void;
  verificarSeEstaCurtida: (id: string) => boolean;
  compartilharMusica: (musica: Musica) => Promise<void>;
  tocarMusica: (musica: Musica) => Promise<void>;
  pausarMusica: () => Promise<void>;
  isPlaying: boolean;
}

const CurtidasContext = createContext<CurtidasContextType | undefined>(undefined);

const todasAsMusicasPadrao: Musica[] = [
  // --- FUNK (18 músicas) ---
  { id: 'f01', nome: 'Baile de Favela', artista: 'MC João', imagem: 'https://picsum.photos/500?random=f01', duracao: '2:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f02', nome: 'Oh Juliana', artista: 'MC Niack', imagem: 'https://picsum.photos/500?random=f02', duracao: '2:10', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f03', nome: 'Tubarão Te Amo', artista: 'MC Ryan', imagem: 'https://picsum.photos/500?random=f03', duracao: '2:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f04', nome: 'Avisa lá', artista: 'MC Kevin', imagem: 'https://picsum.photos/500?random=f04', duracao: '3:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f05', nome: 'Sentou e Gostou', artista: 'MC Jhenny', imagem: 'https://picsum.photos/500?random=f05', duracao: '2:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f06', nome: 'Cracolândia', artista: 'MC Hariel', imagem: 'https://picsum.photos/500?random=f06', duracao: '3:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f07', nome: 'Bipolar', artista: 'MC Davi', imagem: 'https://picsum.photos/500?random=f07', duracao: '2:40', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f08', nome: 'Ela é do Tipo', artista: 'MC Kevin', imagem: 'https://picsum.photos/500?random=f08', duracao: '3:15', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f09', nome: 'Toma Toma Vapo Vapo', artista: 'Zé Felipe', imagem: 'https://picsum.photos/500?random=f09', duracao: '2:25', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f10', nome: 'Vem Me Satisfazer', artista: 'MC Ingryd', imagem: 'https://picsum.photos/500?random=f10', duracao: '2:35', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f11', nome: 'Parado no Bailão', artista: 'MC L Da Vinte', imagem: 'https://picsum.photos/500?random=f11', duracao: '2:55', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f12', nome: 'Combate', artista: 'MC Don Juan', imagem: 'https://picsum.photos/500?random=f12', duracao: '2:40', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f13', nome: 'Deu Onda', artista: 'MC G15', imagem: 'https://picsum.photos/500?random=f13', duracao: '3:00', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f14', nome: 'Meca', artista: 'MC Poze', imagem: 'https://picsum.photos/500?random=f14', duracao: '3:10', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f15', nome: 'Vidigal', artista: 'MC Cabelinho', imagem: 'https://picsum.photos/500?random=f15', duracao: '2:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f16', nome: 'Favela Venceu', artista: 'MC Hariel', imagem: 'https://picsum.photos/500?random=f16', duracao: '3:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f17', nome: 'Tipo Gin', artista: 'MC Kevin o Chris', imagem: 'https://picsum.photos/500?random=f17', duracao: '2:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'f18', nome: 'Jogadinha', artista: 'MC Pedrinho', imagem: 'https://picsum.photos/500?random=f18', duracao: '2:15', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },

  // --- ROCK (18 músicas) ---
  { id: 'r01', nome: 'Bohemian Rhapsody', artista: 'Queen', imagem: 'https://picsum.photos/500?random=r01', duracao: '5:55', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r02', nome: 'Smells Like Teen Spirit', artista: 'Nirvana', imagem: 'https://picsum.photos/500?random=r02', duracao: '5:01', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r03', nome: 'Back In Black', artista: 'AC/DC', imagem: 'https://picsum.photos/500?random=r03', duracao: '4:15', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r04', nome: 'Enter Sandman', artista: 'Metallica', imagem: 'https://picsum.photos/500?random=r04', duracao: '5:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r05', nome: 'Sweet Child O Mine', artista: 'Guns N Roses', imagem: 'https://picsum.photos/500?random=r05', duracao: '5:56', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r06', nome: 'Highway to Hell', artista: 'AC/DC', imagem: 'https://picsum.photos/500?random=r06', duracao: '3:28', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r07', nome: 'Comfortably Numb', artista: 'Pink Floyd', imagem: 'https://picsum.photos/500?random=r07', duracao: '6:23', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r08', nome: 'Stairway to Heaven', artista: 'Led Zeppelin', imagem: 'https://picsum.photos/500?random=r08', duracao: '8:02', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r09', nome: 'Hotel California', artista: 'Eagles', imagem: 'https://picsum.photos/500?random=r09', duracao: '6:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r10', nome: 'Imagine', artista: 'John Lennon', imagem: 'https://picsum.photos/500?random=r10', duracao: '3:03', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r11', nome: 'Black Dog', artista: 'Led Zeppelin', imagem: 'https://picsum.photos/500?random=r11', duracao: '4:54', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r12', nome: 'Wonderwall', artista: 'Oasis', imagem: 'https://picsum.photos/500?random=r12', duracao: '4:18', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r13', nome: 'Under Pressure', artista: 'Queen', imagem: 'https://picsum.photos/500?random=r13', duracao: '4:08', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r14', nome: 'Radio Ga Ga', artista: 'Queen', imagem: 'https://picsum.photos/500?random=r14', duracao: '5:44', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r15', nome: 'Seven Nation Army', artista: 'White Stripes', imagem: 'https://picsum.photos/500?random=r15', duracao: '3:51', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r16', nome: 'Come as You Are', artista: 'Nirvana', imagem: 'https://picsum.photos/500?random=r16', duracao: '3:39', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r17', nome: 'Paranoid', artista: 'Black Sabbath', imagem: 'https://picsum.photos/500?random=r17', duracao: '2:48', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r18', nome: 'Dream On', artista: 'Aerosmith', imagem: 'https://picsum.photos/500?random=r18', duracao: '4:28', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },

  // --- SERTANEJO (18 músicas) ---
  { id: 's01', nome: 'Ai Se Te Pego', artista: 'Michel Teló', imagem: 'https://picsum.photos/500?random=s01', duracao: '2:40', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's02', nome: 'Atrasadinha', artista: 'Felipe Araújo', imagem: 'https://picsum.photos/500?random=s02', duracao: '3:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's03', nome: 'Dona Maria', artista: 'Thiago Brava', imagem: 'https://picsum.photos/500?random=s03', duracao: '2:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's04', nome: 'Apelido Carinhoso', artista: 'Gusttavo Lima', imagem: 'https://picsum.photos/500?random=s04', duracao: '3:10', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's05', nome: 'Infiel', artista: 'Marília Mendonça', imagem: 'https://picsum.photos/500?random=s05', duracao: '2:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's06', nome: 'Notificação Preferida', artista: 'Zé Neto & Cristiano', imagem: 'https://picsum.photos/500?random=s06', duracao: '2:48', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's07', nome: 'Largado às Traças', artista: 'Zé Neto & Cristiano', imagem: 'https://picsum.photos/500?random=s07', duracao: '3:00', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's08', nome: 'Ciumeira', artista: 'Marília Mendonça', imagem: 'https://picsum.photos/500?random=s08', duracao: '2:55', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's09', nome: 'Propaganda', artista: 'Jorge & Mateus', imagem: 'https://picsum.photos/500?random=s09', duracao: '3:12', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's10', nome: 'Estado Decadente', artista: 'Zé Neto & Cristiano', imagem: 'https://picsum.photos/500?random=s10', duracao: '2:40', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's11', nome: 'A gente faz amor', artista: 'Gusttavo Lima', imagem: 'https://picsum.photos/500?random=s11', duracao: '3:15', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's12', nome: 'Medo Bobo', artista: 'Maiara & Maraisa', imagem: 'https://picsum.photos/500?random=s12', duracao: '2:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's13', nome: '10% ', artista: 'Maiara & Maraisa', imagem: 'https://picsum.photos/500?random=s13', duracao: '2:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's14', nome: 'Logo Eu', artista: 'Jorge & Mateus', imagem: 'https://picsum.photos/500?random=s14', duracao: '3:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's15', nome: 'Amor de Rapariga', artista: 'Barões da Pisadinha', imagem: 'https://picsum.photos/500?random=s15', duracao: '2:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's16', nome: 'Recairei', artista: 'Barões da Pisadinha', imagem: 'https://picsum.photos/500?random=s16', duracao: '2:35', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's17', nome: 'Esquece Me Se For Capaz', artista: 'Marília Mendonça', imagem: 'https://picsum.photos/500?random=s17', duracao: '3:10', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 's18', nome: 'Investe em Mim', artista: 'Jonas Esticado', imagem: 'https://picsum.photos/500?random=s18', duracao: '3:00', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },

  // --- POP (16 músicas) ---
  { id: 'p01', nome: 'Blinding Lights', artista: 'The Weeknd', imagem: 'https://picsum.photos/500?random=p01', duracao: '3:22', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p02', nome: 'Starboy', artista: 'The Weeknd', imagem: 'https://picsum.photos/500?random=p02', duracao: '3:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p03', nome: 'Save Your Tears', artista: 'The Weeknd', imagem: 'https://picsum.photos/500?random=p03', duracao: '3:35', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p04', nome: 'Levitating', artista: 'Dua Lipa', imagem: 'https://picsum.photos/500?random=p04', duracao: '3:23', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p05', nome: 'Shape of You', artista: 'Ed Sheeran', imagem: 'https://picsum.photos/500?random=p05', duracao: '3:53', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p06', nome: 'Bad Guy', artista: 'Billie Eilish', imagem: 'https://picsum.photos/500?random=p06', duracao: '3:14', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p07', nome: 'Flowers', artista: 'Miley Cyrus', imagem: 'https://picsum.photos/500?random=p07', duracao: '3:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p08', nome: 'As It Was', artista: 'Harry Styles', imagem: 'https://picsum.photos/500?random=p08', duracao: '2:47', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p09', nome: 'Shake It Off', artista: 'Taylor Swift', imagem: 'https://picsum.photos/500?random=p09', duracao: '3:39', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p10', nome: 'Uptown Funk', artista: 'Bruno Mars', imagem: 'https://picsum.photos/500?random=p10', duracao: '4:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p11', nome: 'Rolling in the Deep', artista: 'Adele', imagem: 'https://picsum.photos/500?random=p11', duracao: '3:48', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p12', nome: 'Bad Romance', artista: 'Lady Gaga', imagem: 'https://picsum.photos/500?random=p12', duracao: '4:54', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p13', nome: 'Can\'t Stop the Feeling', artista: 'Justin Timberlake', imagem: 'https://picsum.photos/500?random=p13', duracao: '3:56', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p14', nome: 'Happy', artista: 'Pharrell Williams', imagem: 'https://picsum.photos/500?random=p14', duracao: '3:53', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p15', nome: 'Sorry', artista: 'Justin Bieber', imagem: 'https://picsum.photos/500?random=p15', duracao: '3:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p16', nome: 'Cheap Thrills', artista: 'Sia', imagem: 'https://picsum.photos/500?random=p16', duracao: '3:31', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
];

export function CurtidasProvider({ children }: { children: React.ReactNode }) {
  const [listaCurtidas, setListaCurtidas] = useState<Musica[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tocarMusica = async (musica: Musica) => {
    if (!musica.audioUrl) return; // Se não tiver áudio, não faz nada
    try {
      if (sound) await sound.unloadAsync();
      const { sound: novoSom } = await Audio.Sound.createAsync({ uri: musica.audioUrl });
      setSound(novoSom);
      await novoSom.playAsync();
      setIsPlaying(true);
    } catch (e) { console.error(e); }
  };

  const pausarMusica = async () => {
    if (sound) { await sound.pauseAsync(); setIsPlaying(false); }
  };

  const alternarCurtida = (musica: Musica) => {
    setListaCurtidas((atual) =>
      atual.some((m) => m.id === musica.id)
        ? atual.filter((m) => m.id !== musica.id)
        : [...atual, musica]
    );
  };

  const verificarSeEstaCurtida = (id: string) => listaCurtidas.some((m) => m.id === id);

const compartilharMusica = async (musica: Musica) => {
  const mensagem = `Estou a ouvir "${musica.nome}" de ${musica.artista} no NMK Music! 🎧`;
  
  if (Platform.OS === 'web') {
    // Para Web: abre o WhatsApp com a mensagem
    const urlCompartilhamento = window.location.origin + `/listaReproducao?id=${musica.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem + ' ' + urlCompartilhamento)}`;
    window.open(whatsappUrl, '_blank');
  } else {
    // Para Mobile: usa a API nativa do sistema
    try {
      await Share.share({
        message: `${mensagem} \n\nOuça aqui: https://nmkmusic.com/track/${musica.id}`,
      });
    } catch (error: any) {
      console.error("Erro ao partilhar:", error.message);
    }
  }
};
  return (
    <CurtidasContext.Provider value={{ 
        todasAsMusicas: todasAsMusicasPadrao, 
        listaCurtidas, 
        alternarCurtida, 
        verificarSeEstaCurtida, 
        compartilharMusica, 
        tocarMusica, 
        pausarMusica, 
        isPlaying 
    }}>
      {children}
    </CurtidasContext.Provider>
  );
}

export function useCurtidas() {
  const context = useContext(CurtidasContext);
  if (!context) throw new Error('useCurtidas deve ser usado dentro de CurtidasProvider');
  return context;
}