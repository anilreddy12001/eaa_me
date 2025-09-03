import React from 'react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '../../contexts/UnityContext';

interface UnityContainerProps {
  className?: string;
}

export function UnityContainer({ className = '' }: UnityContainerProps) {
  const { unityProvider, isLoaded, isError } = useUnity();

  return (
    <Unity 
      unityProvider={unityProvider} 
      className={`w-full h-full ${className}`}
      style={{ visibility: isLoaded && !isError ? 'visible' : 'hidden' }}
    />
  );
}