import axios from "axios";
import { logout } from "./UserService";
import history from "./History";

const API_URL = "http://localhost:8080/api/v1/";

export const TOKEN_STORAGE_LOCATION: string = "JWT";

class ApiService {
    static get(url: string, params: any = null, responseType: string = "json") {
        return this.#doRequest("get", url, null, {
            params: params,
            responseType,
        });
    }

    static post(url: string, data: any) {
        return this.#doRequest("post", url, data);
    }

    static patch(url: string, data: any) {
        return this.#doRequest("patch", url, data);
    }

    static put(url: string, data: any) {
        return this.#doRequest("put", url, data);
    }

    static delete(url: string) {
        return this.#doRequest("delete", url);
    }

    static #doRequest(
        method: string,
        url: string,
        data: any = null,
        otherConfig: any = null
    ) {
        return axios.request(this.#getConfig(method, url, data, otherConfig));
    }

    static #getConfig(
        method: string,
        url: string,
        data: any,
        otherConfig: any
    ) {
        const defaultConfig = {
            method: method,
            url: url,
            data: data,
            baseURL: API_URL,
            headers: this.#getHeaders(data),
            responseType: "json",
        };
        return { ...defaultConfig, ...otherConfig };
    }

    static #getHeaders(data: any = null) {
        let token = sessionStorage.getItem(TOKEN_STORAGE_LOCATION);
        let headers: any = {};

        if (token != null) {
            headers["Authorization"] = "Bearer " + token;
        } else {
            return {};
        }

        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }

        return headers;
    }
}

export default ApiService;
