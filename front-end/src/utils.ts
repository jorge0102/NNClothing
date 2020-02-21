import { createStore } from 'redux';
import { ITokenLogin } from './interfaces/ITokenLogin';
import { ILogin } from './interfaces/ILogin';
import { decode } from "jsonwebtoken";
import { API_URL } from './constants';

// Para cuando recargamos la pagina siga estando logeado
export const generarTokenComprobar = (token: string): ILogin => {
    const { _id, username, isAdmin } = decode(token) as ITokenLogin;
    return { _id, username, isAdmin, token }
}


export const myFetch = async ({
    method = "GET",
    json,
    formData,
    token
}: {
    method?: "GET" | "POST" | "DELETE" | "PUT";
    json?: Object;
    formData?: FormData;
    token?: string;
}) => {
    let headers = new Headers();
    let body = undefined;
    if (json) {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(json);
    } else if (formData) {
        body = formData;
    }
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(API_URL, {
        method,
        headers,
        body
    });
    try {
        const json = await response.json();
        return json;
    } catch {
        return null;
    }
};