import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaViewBase } from "react-native";

interface AddTopicFormProps {
  onAddTopic: (topic: string) => void;
  addTopicProps: string[];
}

export default function AddTopicForm({ onAddTopic }: AddTopicFormProps) {
  const [inputText, setInputText] = useState("");
  const isBlank = inputText.trim() === "";
  const isTooLong = inputText.trim().length > 50;
  const disableButton = isBlank || isTooLong; 


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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  disabledButton: {
    backgroundColor: "#A0CFFF",
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#333333",
  }
});