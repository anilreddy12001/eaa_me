import { UnityContextHook } from 'react-unity-webgl';

export interface UnityConfig {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
}

export interface UnityContextValue extends UnityContextHook {
  isError: boolean;
  errorMessage: string | null;
}

export interface UnityMessage {
  gameObject: string;
  method: string;
  parameter?: string;
}