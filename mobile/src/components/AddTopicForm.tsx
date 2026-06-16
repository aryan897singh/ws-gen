import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaViewBase, TouchableOpacity } from "react-native";

interface AddTopicFormProps {
  onAddTopic: (topic: string) => void;
  existingTopicsSet: Set<string>;
  MAX_TOPIC_LIMIT: number;
}

export default function AddTopicForm({ onAddTopic, existingTopicsSet, MAX_TOPIC_LIMIT }: AddTopicFormProps) {
  const [inputText, setInputText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isBlank = inputText.trim() === "";
  const isTooLong = inputText.trim().length > 50;
  const isDuplicate = existingTopicsSet.has(inputText.toUpperCase().trim())
  const maxTopicLimitHit = existingTopicsSet.size >= MAX_TOPIC_LIMIT;
  const disableButton = isBlank || isTooLong || isDuplicate || maxTopicLimitHit; 

  const handleAddTopic = () => {
    onAddTopic(inputText.toUpperCase().trim());
    setInputText("");
    setShowSuccess(true);
  }

  const handleEnterTopic = (text: string) => {
    setInputText(text);
    setShowSuccess(false);
  }
  


  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Concept</Text>
      <TextInput
        style = {styles.input}
        placeholder="Enter a topic: "
        value = {inputText}
        onChangeText={(text: string) => handleEnterTopic(text)}
        />
        {
          isDuplicate &&
          <Text>Topic Already Exists!</Text>
        }{
          maxTopicLimitHit &&
          <Text>Max Topic Limit has been Reached!</Text>
        }{
          showSuccess && 
          <Text>Succesfully Added Topic!</Text>
        }
      
      <View
        style = {styles.buttonContainer}>
        <TouchableOpacity
          disabled = {disableButton}
          testID="add-button"
          onPress={() => handleAddTopic()}>
          <Text>add</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>cancel</Text>
        </TouchableOpacity>
        </View>
      

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