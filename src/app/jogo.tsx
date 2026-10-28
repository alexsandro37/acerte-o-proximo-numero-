import { useLocalSearchParams } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function Jogo() {
  const params = useLocalSearchParams();
  const nickname = params.nickname;

  const [numeroSorteado] = useState(Math.floor(Math.random() * 100) + 1);
  const [palpite, setPalpite] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [dica, setDica] = useState("");
  const [cor, setCor] = useState("green");
  const [acertou, setAcertou] = useState(false);

  async function chutar() {
    const numero = parseInt(palpite);
    const total = tentativas + 1;
    setTentativas(total);
    setPalpite("");

    if (numero == numeroSorteado) {
      setAcertou(true);
      await addDoc(collection(db, "partidas"), { nickname: nickname, tentativas: total });
    }
    if (numero < numeroSorteado) {
      setDica("O número é maior");
      setCor("green");
    }
    if (numero > numeroSorteado) {
      setDica("O número é menor");
      setCor("red");
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Tentativas: {tentativas}</Text>

      {!acertou && (
        <>
          <TextInput
            placeholder="Seu palpite (1 a 100)"
            keyboardType="number-pad"
            value={palpite}
            onChangeText={setPalpite}
            style={{ borderWidth: 1, padding: 10, fontSize: 18 }}
          />
          <Button title="Chutar" onPress={chutar} />
          <Text style={{ fontSize: 24, textAlign: "center", color: cor }}>{dica}</Text>
        </>
      )}

      {acertou && (
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Você acertou em {tentativas} tentativas!
        </Text>
      )}
    </View>
  );
}
