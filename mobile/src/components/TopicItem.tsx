import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

interface TopicItemProps {
  topic: string;
  onDelete: () => void;
}

export default function TopicItem({ topic, onDelete }: TopicItemProps) {
  const handleDeletePress = () => {
      Alert.alert(
        "Confirm Delete?",      
        "Are you sure you want to delete?",    
        [                  
          {
            text: "CONFIRM",
            onPress: () => console.log("Topic Successfully deleted"),
          },
          {
            text: "CANCEL",
            onPress: () => console.log("Not deleting!"),
            style: "cancel", 
          },
        ]
);


  }



  return (
    <View style = {styles.cardContainer}>
        <Text style = {styles.topicText}>{topic}</Text>
        <TouchableOpacity
            style = {styles.deleteButton}
            onPress = {onDelete}
        >
          <Text>Delete Topic</Text>
          </TouchableOpacity>      
    </View>
  ) ;
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e", // Minimalist dark background
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333333",
    // Retaining the shadow structures from other forms q
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, 
  },
  topicText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e0e0e0", // High contrast light text
    flex: 1,          // Allows text to wrap if it gets too long without pushing the button off-screen
    marginRight: 16,  // Ensures breathing room between text and button
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ef4444", // Minimalist red outline for the destructive action
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  }
});


