import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Inicio() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  function iniciar() {
    const nome = nickname.trim();
    if (nome === "") {
      Alert.alert("Atenção", "Informe seu nickname para começar.");
      return;
    }
    router.push({ pathname: "/jogo", params: { nickname: nome } });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Adivinhe o número</Text>
      <Text style={styles.subtitulo}>Descubra o número entre 1 e 100</Text>

      <TextInput
        style={styles.campo}
        placeholder="Seu nickname"
        value={nickname}
        onChangeText={setNickname}
        maxLength={20}
      />

      <Pressable style={styles.botao} onPress={iniciar}>
        <Text style={styles.textoBotao}>Jogar</Text>
      </Pressable>

      <Pressable style={styles.botaoSecundario} onPress={() => router.push("/ranking")}>
        <Text style={styles.textoSecundario}>Ver ranking</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, justifyContent: "center", padding: 24, gap: 14 },
  titulo: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitulo: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 12 },
  campo: { borderWidth: 1, borderColor: "#999", borderRadius: 8, padding: 12, fontSize: 18 },
  botao: { backgroundColor: "#1e66f5", padding: 14, borderRadius: 8 },
  textoBotao: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  botaoSecundario: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: "#1e66f5" },
  textoSecundario: { color: "#1e66f5", textAlign: "center", fontSize: 18 },
});
