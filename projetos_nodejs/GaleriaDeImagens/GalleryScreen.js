// GalleryScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  SafeAreaView,
  TouchableOpacity, // Importa TouchableOpacity
  Alert, // Importa Alert para confirmação de exclusão
} from 'react-native';

const {width} = Dimensions.get('window');
const imageSize = width * 0.9;

// Componente funcional que recebe 'navigation', 'photos' E 'onRemovePhoto' como props.
const GalleryScreen = ({navigation, photos, onRemovePhoto}) => { // Adiciona onRemovePhoto aqui

  // Função para confirmar e remover a foto
  const confirmRemovePhoto = (id) => {
    Alert.alert(
      "Excluir Foto",
      "Tem certeza que deseja excluir esta foto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => onRemovePhoto(id), // Chama a função de remoção passada via props
          style: "destructive"
        }
      ]
    );
  };

  const renderPhotoItem = ({item}) => (
    <View style={styles.photoContainer}>
      <Image
        source={{uri: item.url}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.caption}>{item.caption}</Text>
      {/* NOVO: Botão de exclusão */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmRemovePhoto(item.id)} // Passa o ID da foto para a função
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={item => item.id} // AGORA USA O ID ÚNICO DA FOTO COMO CHAVE
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Foto"
          onPress={() => navigation.navigate('AddPhoto')}
          color="#3498db"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  listContent: {
    paddingBottom: 20,
  },
  photoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden', // Garante que a imagem e o botão respeitem o borderRadius
  },
  image: {
    width: '100%',
    height: imageSize,
  },
  caption: {
    fontSize: 16,
    padding: 15,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 55,

  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Cor de fundo do botão de exclusão
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10, // Arredonda as bordas inferiores para combinar com o container
    borderBottomRightRadius: 10,
    marginTop: -1, // Pequeno ajuste para sobrepor a borda do caption
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default GalleryScreen;