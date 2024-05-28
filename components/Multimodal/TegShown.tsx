import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useSettingStore from '../../stores/useSettingsStore';
interface TagProps {
    tag: string;
    type: string
}

// Tag 组件
const TegShown: React.FC<TagProps> = ({ tag, type }) => {
    const { tempImgTags, setTempImgTags, tempMusicTags, setTempMusicTags, book, setBook } = useSettingStore();
    // 处理点击事件
    // 

    const handleRemoveTag = (index: number) => {
        if (type === 'music') {
            const newTags = [...tempMusicTags];
            newTags.splice(index, 1);//删除数组中的元素
            setTempMusicTags(newTags);
        } else {
            const newTags = [...tempImgTags];
            newTags.splice(index, 1);
            setTempImgTags(newTags);
        }
    }

    return (
        // <View style={styles.tagContainer}>
        <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => {
                const index = type === 'music' ? tempMusicTags.indexOf(tag) : tempImgTags.indexOf(tag);
                handleRemoveTag(index)
            }}>
                <Text style={styles.removeTag}>x</Text>
            </TouchableOpacity>
        </View>

        // </View>
    );
};

// 样式
const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius: 4,
        padding: 4,
        margin: 2,
        alignSelf: 'flex-start' // 添加这个属性以使每个标签的宽度根据内容自动调整
    },
    removeTag: {
        marginLeft: 5,
        color: '#000',
    },
    tagContainer: {

        flexWrap: 'wrap', // 允许内容换行
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

export default TegShown;
