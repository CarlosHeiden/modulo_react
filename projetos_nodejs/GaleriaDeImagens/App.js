// App.js
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GalleryScreen from './GalleryScreen';
import AddPhotoScreen from './AddPhotoScreen';

const Stack = createStackNavigator();

const App = () => {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = newPhoto => {
    // Adiciona um ID único para cada foto, que será útil para a exclusão
    setPhotos([...photos, {...newPhoto, id: Math.random().toString()}]);
  };

  // NOVA FUNÇÃO: handleRemovePhoto
  const handleRemovePhoto = idToRemove => {
    // Filtra o array de fotos, removendo a foto com o ID correspondente
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== idToRemove));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" options={{title: 'Galeria de Imagens'}}>
          {props => (
            <GalleryScreen
              {...props}
              photos={photos}
              onRemovePhoto={handleRemovePhoto} // PASSA A NOVA FUNÇÃO AQUI
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddPhoto" options={{title: 'Adicionar Nova Foto'}}>
          {props => (
            <AddPhotoScreen {...props} onAddPhoto={handleAddPhoto} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;