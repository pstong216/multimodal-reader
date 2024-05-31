import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import ReloadIcon from "../assets/reload.svg"; // Ensure this path is correct
import { RootStackParamList } from "../types";
import { RouteProp } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

type PicScreenRouteProp = RouteProp<RootStackParamList, "Pic">;

type Props = {
  route: PicScreenRouteProp;
};
const PicScreen: FC<Props> = ({ route }) => {
  const { url, text } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            onError={(e) => console.log("Image load error", e)}
          />
          <TouchableOpacity style={styles.reloadButton}>
            <ReloadIcon width={24} height={24} fill="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quoteText} numberOfLines={8} ellipsizeMode="tail">
          {`"${text}"`}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    padding: 20,
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  imagePlaceholder: {
    width: width * 0.6,
    height: height * 0.4,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  reloadButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
    borderLeftWidth: 1,
    borderLeftColor: "#667080",
  },
  quoteText: {
    color: "#FFF",
    fontFamily: "Times New Roman",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "justify",
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    left: width / 2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 24,
  },
});

export default PicScreen;
