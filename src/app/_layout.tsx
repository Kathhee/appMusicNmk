import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '../components/animated-icon';
import { CurtidasProvider } from '../components/dados';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <CurtidasProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0B0B0E',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'NMK Music' }} />
          <Stack.Screen name="listaReproducao" options={{ title: 'Tocando Agora' }} />
          <Stack.Screen name="explore" options={{ title: 'Explorar' }} />
        </Stack>
      </ThemeProvider>
    </CurtidasProvider>
  );
}