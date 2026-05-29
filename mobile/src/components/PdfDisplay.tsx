import React from 'react';
import { View } from 'react-native';

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PdfDisplayProps {
  status: ApiStatus;
  pdfUrl?: string; 
  errorMessage?: string; 
  onDownload?: () => void; 
}

export default function PdfDisplay({ status, pdfUrl, errorMessage, onDownload }: PdfDisplayProps) {
  return <View />;
}