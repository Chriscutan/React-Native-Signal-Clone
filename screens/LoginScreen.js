import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://imgs.search.brave.com/SirVQQ-36XKZzAc8B7GYBv8V9H3v8ZC9MGnJV--6OXA/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly93ZWIu/YWJpaml0YS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDYvU2lnbmFsX3Vs/dHJhbWFyaW5lX2lj/b24ucG5n",
        }}
        style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
      />
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button title="Login" onPress={signIn} containerStyle={styles.button} />
      <Button
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
  },
});
