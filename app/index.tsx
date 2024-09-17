import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/getting-started.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.wrapper}>
        <Animated.Text style={styles.text} entering={FadeInRight.delay(300).duration(500)}>Stay Updated</Animated.Text >
        <Animated.Text style={{ fontSize: 16, color: "#fff", textAlign: "center", paddingHorizontal: 20, }} entering={FadeInRight.delay(700).duration(500)}>Get breaking news and personalized updates directly to your feed</Animated.Text>

        <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: Colors.tint,
    padding: 10,
    borderRadius: 5,
    marginVertical: 20
  },
});
