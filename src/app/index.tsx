import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Inicio() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  function jogar() {
    if (nickname == "") {
      Alert.alert("Digite seu nickname");
      return;
    }
    router.push({ pathname: "/jogo", params: { nickname: nickname } });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 26, textAlign: "center" }}>Adivinhe o número</Text>
      <TextInput
        placeholder="Seu nickname"
        value={nickname}
        onChangeText={setNickname}
        style={{ borderWidth: 1, padding: 10, fontSize: 18 }}
      />
      <Button title="Jogar" onPress={jogar} />
      <Button title="Ver ranking" onPress={() => router.push("/ranking")} />
    </View>
  );
}
