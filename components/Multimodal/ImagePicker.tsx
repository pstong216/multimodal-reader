import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePickerLib from 'expo-image-picker';

const ImagePicker: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePickerLib.launchImageLibraryAsync({
      mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.placeholder}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Pick an image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  placeholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ImagePicker;

