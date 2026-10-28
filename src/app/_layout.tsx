import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Adivinhe o Número" }} />
      <Stack.Screen name="jogo" options={{ title: "Partida" }} />
      <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
    </Stack>
  );
}
