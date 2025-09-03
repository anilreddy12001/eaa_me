import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { UNITY_CONFIG } from '../config/unity';
import type { UnityContextValue, UnityMessage } from '../types/unity';

const UnityContext = createContext<UnityContextValue | null>(null);

export function UnityProvider({ children }: { children: ReactNode }) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const unityContext = useUnityContext(UNITY_CONFIG);

  const handleError = useCallback((message: string) => {
    setIsError(true);
    setErrorMessage(message);
  }, []);

  React.useEffect(() => {
    const handleUnityError = (message: string) => {
      handleError(`Unity Error: ${message}`);
    };

    window.addEventListener('unityError', handleUnityError as any);
    return () => window.removeEventListener('unityError', handleUnityError as any);
  }, [handleError]);

  const contextValue: UnityContextValue = {
    ...unityContext,
    isError,
    errorMessage,
  };

  return (
    <UnityContext.Provider value={contextValue}>
      {children}
    </UnityContext.Provider>
  );
}

export function useUnity() {
  const context = useContext(UnityContext);
  if (!context) {
    throw new Error('useUnity must be used within a UnityProvider');
  }
  return context;
}