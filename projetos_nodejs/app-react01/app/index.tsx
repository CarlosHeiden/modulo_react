import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HELLO WORD</Text>
    </View>
  );
}