import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HALLO WORD , ESTE EH MEU PRIMEIRO  TESTE COM REACT E FUNCIONOU !!!!</Text>
      <StatusBar style="auto" />
      <Text>HALLO WORD , ESTE EH MEU PRIMEIRO  TESTE COM REACT E FUNCIONOU !!!!</Text>
      <StatusBar  style= "auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666ee7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
