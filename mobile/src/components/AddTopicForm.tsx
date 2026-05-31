import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface AddTopicFormProps {
  onAddTopic: (topic: string) => void;
  addTopicProps: string[];
}

export default function AddTopicForm({ onAddTopic }: AddTopicFormProps) {
  const [inputText, setInputText] = useState("");


  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Concept</Text>
      
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    // Basic drop shadow for some depth (works on both iOS and Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#f8f9fa",
    marginBottom: 16,
  },
  buttonContainer: {
    borderRadius: 6,
    overflow: "hidden",
  }
});