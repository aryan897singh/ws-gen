import React from "react";
import { View } from "react-native";

/*This 'dto' needs to be sent to backend for processing
hence the screen holding this component must hold this in it's state */
export interface ProblemSettings {
  totalProblems: number;
  chocolateProblems: number;
  prompt: string;
}

interface ProblemSelecFormProps {
  onGenerate: (settings: ProblemSettings) => void;
}

export default function ProblemSelecForm({
  onGenerate,
}: ProblemSelecFormProps) {
  return <View />;
}
