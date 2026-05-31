import React from "react";
import { View } from "react-native";

interface TopicItemProps {
  topic: string;
  onDelete: () => void;
}

export default function TopicItem({ topic, onDelete }: TopicItemProps) {
  return <View />;
}
