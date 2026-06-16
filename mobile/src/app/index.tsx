import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
// Double check this path! It might be "../../components/AddTopicForm" depending on your exact folder structure
import AddTopicForm from "../components/AddTopicForm"; 

export default function Index() {
  const [dummyTopics, setDummyTopics] = useState<Set<string>>(new Set());

  const handleMockAdd = (topic: string) => {
    console.log("SUCCESSFULLY ADDED:", topic);
    setDummyTopics((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(topic);
      return newSet;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <AddTopicForm
          onAddTopic={handleMockAdd}
          existingTopicsSet={dummyTopics}
          MAX_TOPIC_LIMIT={10}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5", 
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: "center", 
  },
});