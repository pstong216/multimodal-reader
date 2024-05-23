import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ToggleSwitch from './Multimodal/ToggleSwitch';
import ImagePicker from './Multimodal/ImagePicker';
import ColorPicker from './Multimodal/ColorPicker';
import Dropdown from './Multimodal/Dropdown';
import TagInput from './Multimodal/TagInput';

const Multimodal: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [imageEnabled, setImageEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [themeEnabled, setThemeEnabled] = useState(false);
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [tags, setTags] = useState<string[]>([]);

  return (
    <ScrollView style={styles.container}>
      <ToggleSwitch label="Multimodal Content Generation" value={themeEnabled} onValueChange={setThemeEnabled} />
      <View style={styles.section}>
        <ToggleSwitch label="Audio" value={audioEnabled} onValueChange={setAudioEnabled} />
        <TagInput tags={tags} onTagsChange={setTags} />
      </View>
      <View style={styles.section}>
        <ToggleSwitch label="Image" value={imageEnabled} onValueChange={setImageEnabled} />
        <TagInput tags={tags} onTagsChange={setTags} />
      </View>
      <View style={styles.section}>
        <ToggleSwitch label="Vibration" value={vibrationEnabled} onValueChange={setVibrationEnabled} />
      </View>
      <View style={styles.section}>
        <ToggleSwitch label="Theme" value={themeEnabled} onValueChange={setThemeEnabled} />
        <View style={styles.themeOptions}>
          <Text>Background Image</Text>
          <ImagePicker />
        </View>
        <View style={styles.themeOptions}>
          <Text>Font Family</Text>
          <Dropdown options={['Times New Roman', 'Arial', 'Courier']} selectedValue={fontFamily} onValueChange={setFontFamily} />
        </View>
        <View style={styles.themeOptions}>
          <Text>Font Color</Text>
          <ColorPicker />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default Multimodal;

