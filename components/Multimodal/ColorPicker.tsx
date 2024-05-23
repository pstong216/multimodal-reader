import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Button, Modal, TouchableOpacity } from 'react-native';
import ColorPickerWheel from 'react-native-color-picker-wheel';

const { width } = Dimensions.get('window');

const ColorPicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const onColorSelected = (color) => {
    setSelectedColor(color);
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Color" onPress={togglePicker} />
      {selectedColor && <Text style={styles.colorText}>Selected Color: {selectedColor}</Text>}

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={togglePicker}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Color</Text>
            <ColorPickerWheel
              style={styles.picker}
              initialColor={selectedColor}
              onColorChangeComplete={color => setSelectedColor(color)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={() => onColorSelected(selectedColor)}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={togglePicker}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: width * 0.8,
    height: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  confirmButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#667080',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6788BD',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  colorText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ColorPicker;
