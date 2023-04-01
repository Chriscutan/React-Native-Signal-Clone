import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Icon, Input } from "@rneui/themed";
import { addDoc } from "firebase/firestore";
import { chatsRef } from "../firebase";
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(chatsRef, {
      chatName: input,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Input
        placeholder="Enter a Chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} title="Add new chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
