import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  progress: number;
}

export function LoadingIndicator({ progress }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-lg font-medium">
        Loading Energy Analytics... {Math.round(progress * 100)}%
      </p>
    </div>
  );
}