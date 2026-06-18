import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Slider from '@react-native-community/slider';

/*This 'dto' needs to be sent to backend for processing
hence the screen holding this component must hold this in it's state */
export interface ProblemSettings {
  totalProblems: number;
  chocolateProblems: number;
  prompt: string;
}

interface ProblemSelecFormProps {
  onGenerate: ({totalProblems, chocolateProblems, prompt}: ProblemSettings) => void;
  MAX_PROBLEM_COUNT: number;
  MAX_PROMPT_CHAR_COUNT: number;
}

export default function ProblemSelecForm( {onGenerate, MAX_PROBLEM_COUNT, MAX_PROMPT_CHAR_COUNT}: ProblemSelecFormProps) {
  //DEV NOTE: Problem = Total Problem Count | Chocolate = Tricky Question Count | Rule: Chocolate <= Problem
  const [problemSliderValue, setProblemSliderValue] = useState(1);
  const [chocolateSliderValue, setChocolateSliderValue] = useState(0);
  const [prompt, setPrompt] = useState("");
  
  const isProblemCountExceedMax = problemSliderValue > MAX_PROBLEM_COUNT;
  const isChocolateCountExceedMax = chocolateSliderValue > problemSliderValue;
  const isProblemCountNotEnough = problemSliderValue < 1;
  const isChocolateCountNotEnough = chocolateSliderValue < 0;
  const isGenerateDisabled = isProblemCountExceedMax || isChocolateCountExceedMax || isProblemCountNotEnough || isChocolateCountNotEnough;

  return(
    <View
      style={styles.container}>
        <Text
          style={styles.header}>Total Problem Count:</Text>
        <Slider
            testID="total-problems-slider"
            style={{ width: '100%', height: 40 }}
            minimumValue={1} 
            maximumValue={MAX_PROBLEM_COUNT} 
            step={1} 
            value={problemSliderValue}
            onValueChange={(val: number) => {
              setProblemSliderValue(val);
            }}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#e0e0e0"
            thumbTintColor="#007AFF"
        />

        
        <Text
          style={styles.header}>Chocolate Problem Count: (Part of Total Problem Count)</Text>
        <Text>Note: Chocolate Problems are trickier problems. You cannot input more than the total problem count!</Text>
        <Slider
            testID="chocolate-problems-slider"
            style={{ width: '100%', height: 40 }}
            minimumValue={0} 
            maximumValue={problemSliderValue} 
            step={1} 
            value={problemSliderValue}
            onValueChange={(val: number) => {
              setChocolateSliderValue(val);
            }}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#e0e0e0"
            thumbTintColor="#007AFF"
        />

              <Text style={styles.header}>Instructions (Optional) </Text>
        <TextInput 
          style={styles.input}
          maxLength={MAX_PROMPT_CHAR_COUNT}
          onChangeText={(val: string) => setPrompt(val)}
          ></TextInput>

        <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={isGenerateDisabled}
                  testID="gen-button"
                  onPress={() => onGenerate({
                    totalProblems: problemSliderValue, 
                    chocolateProblems: chocolateSliderValue, 
                    prompt: prompt})}
                >
                  <Text>Generate Problem Set!</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                  testID="cancel-button">
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>


      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4a4a4a",
    marginBottom: 8,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    height: 100,
    textAlignVertical: "top",
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
});