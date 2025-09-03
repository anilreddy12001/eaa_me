import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-red-500">
      <AlertCircle className="w-8 h-8" />
      <p className="text-lg font-medium">Error loading Unity application:</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}