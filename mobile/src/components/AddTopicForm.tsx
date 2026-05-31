import React from "react";
import { View } from "react-native";

interface AddTopicFormProps {
  onAddTopic: (topic: string) => void;
  addTopicProps: string[];
}

export default function AddTopicForm({
  onAddTopic,
  addTopicProps,
}: AddTopicFormProps) {
  return <View />;
}
