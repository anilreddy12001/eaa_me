import { UnityConfig } from '../types/unity';

// Unity build configuration
//\\INBLRVM61753026\cg ui\public\Build
// file:\\10.51.109.90\cg ui\public\Build
export const UNITY_CONFIG: UnityConfig = {
  loaderUrl: '/energy-analytics/Build/WB.loader.js',//WB2.loader //Build/webgl.loader.js
  dataUrl: '/energy-analytics/Build/webgl.data',//Build/webgl.data // to be replaced with internal file server url
  frameworkUrl: '/energy-analytics/Build/build.framework.js',//build.framework.js ///Build/webgl.framework.js
  codeUrl: '/energy-analytics/Build/build.wasm' //webgl.wasm //https://anilproject12001.web.app/build.wasm //WB.wasm.gz
};
