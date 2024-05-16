import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import useSettingsStore from '../stores/useSettingsStore';
import React from 'react';

const SettingsScreen = () => {
    const { fontSize, fontFamily, background, setFontSize, setFontFamily, setBackground } = useSettingsStore();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize, fontFamily, color: background }}>Sample Text</Text>
            <Button title="Increase Font Size" onPress={() => setFontSize(fontSize + 1)} />
            <Button title="Decrease Font Size" onPress={() => setFontSize(fontSize - 1)} />
            <TouchableOpacity onPress={() => setFontFamily('Arial')}>
                <Text>Change Font to Arial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBackground('gray')}>
                <Text>Change Theme Color to Gray</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SettingsScreen;