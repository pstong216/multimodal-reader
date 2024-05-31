//@ts-check
import "react-native-gesture-handler";
import "react-native-get-random-values";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import ReadingScreen from "./components/ReadingScreen";
import SettingScreen from "./components/SettingScreen";
import Multimodal from "./components/Multimodal";
import PicScreen from "./components/PicScreen";
import { RootStackParamList } from "./types";
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Multimodal" component={Multimodal} />
        <Stack.Screen name="Pic" component={PicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
