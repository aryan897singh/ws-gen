import React from 'react';
import { View } from 'react-native';

interface AddTopicFormProps {
    onAddTopic: (topic: string) => void;
}

export default function AddTopicForm({onAddTopic} : AddTopicFormProps) {
  return <View />;
}