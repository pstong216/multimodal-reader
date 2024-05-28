import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useSettingStore from '../../stores/useSettingsStore';
interface TagProps {
    text: string;
    type: string
}

// Tag 组件
const Tag: React.FC<TagProps> = ({ text, type }) => {
    const { tempImgTags, setTempImgTags, tempMusicTags, setTempMusicTags, book, setBook } = useSettingStore();
    // 处理点击事件
    // 
    const handlePress = () => {
        // Alert.alert('Clicked!', `You clicked on ${text}`);
        // 替换store里book里的数据，setBook({ ...book, multiModel: { ...book.multiModel, imgStyle: [...book.multiModel.imgStyle,text] } });
        if (type === 'music') {
            // Alert.alert('Clicked!', `You clicked on ${text}`);
            setTempMusicTags([...tempMusicTags, text]);
        } else {
            setTempImgTags([...tempImgTags, text]);
        }

    };
    const handleRemoveTag = (index: number) => {
        if (type === 'music') {
            const newTags = [...tempMusicTags];
            newTags.splice(index, 1);
            setTempMusicTags(newTags);
        } else {
            const newTags = [...tempImgTags];
            newTags.splice(index, 1);
            setTempImgTags(newTags);
        }
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{text}</Text>
                {/* <TouchableOpacity onPress={() => {
                    const index = type === 'music' ? tempMusicTags.indexOf(text) : tempImgTags.indexOf(text);
                    handleRemoveTag(index)
                }}>
                    <Text style={styles.removeTag}>x</Text>
                </TouchableOpacity> */}
            </View>

        </TouchableOpacity>
    );
};

// 样式
const styles = StyleSheet.create({
    removeTag: {
        marginLeft: 5,
        color: '#000',
    },
    tagContainer: {
        flexDirection: 'row',
        backgroundColor: '#DADADA63', // 半透明灰色背景
        paddingHorizontal: 10, // 水平内边距
        paddingVertical: 5, // 垂直内边距
        borderRadius: 15, // 圆角
        marginRight: 8, // 右边距
        marginTop: 8, // 上边距
        alignSelf: 'flex-start' // 使容器的宽度自适应内容
    },
    tagText: {
        color: '#000', // 文本颜色
        fontSize: 14, // 字体大小
    }
});

export default Tag;
