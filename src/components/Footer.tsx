import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Footer({ ativo }: { ativo: string }) {
  const router = useRouter();
  const abas = [
    { nome: 'Início', rota: '/' },
    { nome: 'Reproduções', rota: '/listaReproducao' },
    { nome: 'Playlist', rota: '/explore' },
    { nome: 'Curtidas', rota: '/curtidas' }
  ];

  return (
    <View style={styles.footerContainer}>
      {abas.map((aba) => (
        <Pressable 
          key={aba.nome} 
          style={styles.footerTab} 
          onPress={() => router.push(aba.rota as any)}
        >
          <Text style={[styles.footerText, ativo === aba.nome && styles.footerTextAtivo]}>
            {aba.nome}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 75, 
    backgroundColor: '#12121C', 
    flexDirection: 'row', 
    borderTopWidth: 0.5, 
    borderColor: '#222',
    zIndex: 10
  },
  footerTab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#777', fontSize: 12, fontWeight: '600' },
  footerTextAtivo: { color: '#1ED760' },
});