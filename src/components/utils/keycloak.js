import Keycloak from "keycloak-js";
import React, { useCallback, useState, useEffect } from 'react';

const keycloak = new Keycloak({
    url:window.config.VITE_KEYCLOAK_AUTH_URL,//  'http://192.168.41.132:8080/auth',//import.meta.env.VITE_KEYCLOAK_AUTH_URL,
    realm: window.config.VITE_UI_APP_KEYCLOAK_REALM,//'BusinessConsole-dev',//import.meta.env.VITE_UI_APP_KEYCLOAK_REALM,
    clientId: window.config.VITE_UI_APP_KEYCLOAK_CLIENTID,//"concession-frontend"//import.meta.env.VITE_UI_APP_KEYCLOAK_CLIENTID

});
/*
{
  "realm": "AUTOCON-test",
  "auth-server-url": "http://192.168.41.115:8080/auth/",
  "ssl-required": "external",
  "resource": "concession-frontend",
  "public-client": true,
  "confidential-port": 0
}
*/

export const isAuthenticated = () => {
    return keycloak.authenticated?"true":"false"
}

export const securePage = () => {
    console.log(localStorage.getItem("react-token"))
    if(!isAuthenticated())
        keycloak.login()
}

export const logout = () => {
    localStorage.setItem("react-token", "");
    window.location.href = "/"
    sessionStorage.removeItem("selectedTab");
    sessionStorage.removeItem("designEngineerList");
    sessionStorage.removeItem("stressEngineerList");
    keycloak.logout()
}

export const useRefreshToken = () => {
    setTimeout(() => {
        console.log("Actualizando token...")
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            console.error('Failed to refresh token');
        });
    }, 60000)
}

export default keycloak