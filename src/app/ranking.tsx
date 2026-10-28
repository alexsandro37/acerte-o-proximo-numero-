import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

type Partida = {
  id: string;
  nickname: string;
  tentativas: number;
};

export default function Ranking() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const consulta = query(
          collection(db, "partidas"),
          orderBy("tentativas", "asc"),
          limit(20)
        );
        const snapshot = await getDocs(consulta);
        setPartidas(
          snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Partida, "id">) }))
        );
      } catch (erro) {
        console.log(erro);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.lista}
      data={partidas}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhuma partida registrada ainda.</Text>}
      renderItem={({ item, index }) => (
        <View style={styles.linha}>
          <Text style={styles.posicao}>{index + 1}º</Text>
          <Text style={styles.nome}>{item.nickname}</Text>
          <Text style={styles.tentativas}>{item.tentativas}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 16, gap: 8 },
  linha: { flexDirection: "row", alignItems: "center", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  posicao: { width: 44, fontSize: 18, fontWeight: "bold" },
  nome: { flex: 1, fontSize: 18 },
  tentativas: { fontSize: 18, fontWeight: "bold" },
  vazio: { textAlign: "center", marginTop: 30, fontSize: 16, color: "#555" },
});
