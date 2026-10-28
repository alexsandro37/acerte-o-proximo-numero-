import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function Ranking() {
  const [lista, setLista] = useState<any[]>([]);

  async function carregar() {
    const consulta = query(collection(db, "partidas"), orderBy("tentativas"));
    const resposta = await getDocs(consulta);
    const partidas: any[] = [];
    resposta.forEach((documento) => {
      partidas.push({ id: documento.id, ...documento.data() });
    });
    setLista(partidas);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text style={{ fontSize: 18, paddingVertical: 4 }}>
            {index + 1}º {item.nickname} - {item.tentativas} tentativas
          </Text>
        )}
      />
    </View>
  );
}
