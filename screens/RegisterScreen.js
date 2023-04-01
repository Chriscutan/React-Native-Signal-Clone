import { StyleSheet, View } from "react-native";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://imgs.search.brave.com/rlQCQt0AchExzged6CNmDIjJeTbWwFC8UwkO13sOJl8/rs:fit:980:980:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z18zMjkxMTUucG5n",
        });
        navigation.replac("Home");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h4 style={{ marginBottom: 50 }}>
        Create Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture (Optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
