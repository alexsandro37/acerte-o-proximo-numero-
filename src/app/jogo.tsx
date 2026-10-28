import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

const sortear = () => Math.floor(Math.random() * 100) + 1;

export default function Jogo() {
  const router = useRouter();
  const { nickname } = useLocalSearchParams<{ nickname: string }>();

  const [numeroSorteado, setNumeroSorteado] = useState(sortear);
  const [palpite, setPalpite] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [dica, setDica] = useState<{ texto: string; cor: string } | null>(null);
  const [acertou, setAcertou] = useState(false);

  async function salvarResultado(total: number) {
    try {
      await addDoc(collection(db, "partidas"), {
        nickname,
        tentativas: total,
        data: Date.now(),
      });
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar o resultado no ranking.");
    }
  }

  async function chutar() {
    const valor = parseInt(palpite, 10);
    if (isNaN(valor) || valor < 1 || valor > 100) {
      Alert.alert("Atenção", "Digite um número entre 1 e 100.");
      return;
    }

    const total = tentativas + 1;
    setTentativas(total);
    setPalpite("");

    if (valor === numeroSorteado) {
      setAcertou(true);
      setDica(null);
      await salvarResultado(total);
    } else if (numeroSorteado > valor) {
      setDica({ texto: "O número é maior", cor: "green" });
    } else {
      setDica({ texto: "O número é menor", cor: "red" });
    }
  }

  function novaPartida() {
    setNumeroSorteado(sortear());
    setPalpite("");
    setTentativas(0);
    setDica(null);
    setAcertou(false);
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.jogador}>Jogador: {nickname}</Text>
      <Text style={styles.contador}>Tentativas: {tentativas}</Text>

      {acertou ? (
        <View style={styles.vitoria}>
          <Text style={styles.textoVitoria}>Você acertou, {nickname}!</Text>
          <Text style={styles.textoTentativas}>
            O número era {numeroSorteado} e você precisou de {tentativas}{" "}
            {tentativas === 1 ? "tentativa" : "tentativas"}.
          </Text>

          <Pressable style={styles.botao} onPress={novaPartida}>
            <Text style={styles.textoBotao}>Jogar de novo</Text>
          </Pressable>
          <Pressable style={styles.botaoSecundario} onPress={() => router.push("/ranking")}>
            <Text style={styles.textoSecundario}>Ver ranking</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.campo}
            placeholder="Seu palpite (1 a 100)"
            keyboardType="number-pad"
            value={palpite}
            onChangeText={setPalpite}
            maxLength={3}
          />

          <Pressable style={styles.botao} onPress={chutar}>
            <Text style={styles.textoBotao}>Chutar</Text>
          </Pressable>

          {dica && <Text style={[styles.dica, { color: dica.cor }]}>{dica.texto}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 14 },
  jogador: { fontSize: 18, fontWeight: "bold" },
  contador: { fontSize: 16, color: "#555" },
  campo: { borderWidth: 1, borderColor: "#999", borderRadius: 8, padding: 12, fontSize: 22, textAlign: "center" },
  botao: { backgroundColor: "#1e66f5", padding: 14, borderRadius: 8 },
  textoBotao: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  botaoSecundario: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: "#1e66f5" },
  textoSecundario: { color: "#1e66f5", textAlign: "center", fontSize: 18 },
  dica: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  vitoria: { gap: 14, marginTop: 20 },
  textoVitoria: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "green" },
  textoTentativas: { fontSize: 18, textAlign: "center" },
});
