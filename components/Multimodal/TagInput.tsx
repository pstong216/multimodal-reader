import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import useSettingState from '../../stores/useSettingsStore';
interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    if (tag.length > 0) {
      onTagsChange(tag);
      setTag('');
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        onSubmitEditing={handleAddTag}
        placeholder="Add a tag"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTag}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: '10%',
    // height: '10%',
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4

  },
  buttonText: {
    color: '#000',
    fontSize: 16
  },
  container: {
    flexDirection: 'row', // 设置为行方向以使输入框和按钮水平排列
    marginVertical: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 4,
    padding: 4,
    margin: 2,
  },
  tagText: {
    color: '#000',
    marginRight: 4,
  },
  removeTag: {
    color: '#000',
  },
  input: {
    flex: 1, // 输入框占据剩余空间，确保最大可能的输入空间
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,

    marginRight: 8, // 在输入框和按钮之间提供一定的间距
    // marginTop: 8,
  },
});

export default TagInput;
