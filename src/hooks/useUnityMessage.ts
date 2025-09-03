import { useCallback } from 'react';
import { useUnity } from '../contexts/UnityContext';
import type { UnityMessage } from '../types/unity';

export function useUnityMessage() {
  const { sendMessage, addEventListener, removeEventListener } = useUnity();

  const sendToUnity = useCallback(({ gameObject, method, parameter = '' }: UnityMessage) => {
    try {
      sendMessage(gameObject, method, parameter);
    } catch (error) {
      console.error('Failed to send message to Unity:', error);
    }
  }, [sendMessage]);

  return {
    sendToUnity,
    addEventListener,
    removeEventListener,
  };
}