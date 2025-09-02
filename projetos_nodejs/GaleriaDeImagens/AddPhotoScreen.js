// AddPhotoScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image, // Importa Image para pré-visualizar a foto selecionada
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importa o ImagePicker

const AddPhotoScreen = ({navigation, onAddPhoto}) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState(null); // NOVO ESTADO para a URI da imagem selecionada

  // NOVO: Função para escolher uma imagem da galeria
  const pickImage = async () => {
    // Solicita permissões de acesso à galeria de mídia
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'É preciso permitir acesso à galeria para escolher fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsEditing: true, // Permite editar (cortar, etc.)
      aspect: [4, 3], // Proporção da edição
      quality: 1, // Qualidade da imagem
    });

    // Se o usuário não cancelou e uma imagem foi selecionada
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri); // Armazena a URI da imagem selecionada
      setPhotoUrl(''); // Limpa o campo de URL se uma imagem foi selecionada localmente
    }
  };

  const handleSubmit = () => {
    // A foto pode vir do campo de URL OU da seleção local
    const finalPhotoUri = selectedImageUri || photoUrl;

    if (!finalPhotoUri || !caption) {
      Alert.alert('Erro', 'Por favor, forneça uma imagem (URL ou da galeria) e uma legenda.');
      return;
    }

    const newPhoto = {
      url: finalPhotoUri, // Usa a URI selecionada localmente ou a URL digitada
      caption: caption,
    };

    onAddPhoto(newPhoto);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Legenda:</Text>
        <TextInput
          style={styles.input}
          value={caption}
          onChangeText={setCaption}
          placeholder="Ex: Pôr do sol na praia"
          multiline
        />

        {/* NOVO: Botão para escolher foto da galeria */}
        <Button title="Escolher Foto da Galeria" onPress={pickImage} color="#6c5ce7" />

        {/* Pré-visualização da imagem selecionada */}
        {selectedImageUri && (
          <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
        )}

        <Text style={styles.orText}>OU</Text>

        <Text style={styles.label}>URL da Imagem (opcional se escolher da galeria):</Text>
        <TextInput
          style={styles.input}
          value={photoUrl}
          onChangeText={text => {
            setPhotoUrl(text);
            setSelectedImageUri(null); // Limpa a seleção local se o usuário começar a digitar um URL
          }}
          placeholder="Ex: https://exemplo.com/foto.jpg"
        />

        <Button title="Salvar Foto" onPress={handleSubmit} color="#2ecc71" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default AddPhotoScreen;