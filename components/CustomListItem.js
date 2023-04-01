import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setChatMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://imgs.search.brave.com/rlQCQt0AchExzged6CNmDIjJeTbWwFC8UwkO13sOJl8/rs:fit:980:980:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z18zMjkxMTUucG5n",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
