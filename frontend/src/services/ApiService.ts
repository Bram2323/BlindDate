import axios from "axios";
import { logout } from "./UserService";
import history from "./History";

const API_URL = "http://localhost:8080/api/v1/";

export const TOKEN_STORAGE_LOCATION: string = "JWT";

class ApiService {
    static get(url: string, params: any) {
        return this.#doRequest("get", url, null, { params: params });
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
        return axios
            .request(this.#getConfig(method, url, data, otherConfig))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                    const currentPath = history.location.pathname;
                    history.navigate("/login", {
                        state: {
                            prevPath: currentPath,
                        },
                    });
                }
                return Promise.reject(error);
            });
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
            headers: this.#getHeaders(),
        };
        return { ...defaultConfig, ...otherConfig };
    }

    static #getHeaders() {
        let token = sessionStorage.getItem(TOKEN_STORAGE_LOCATION);

        if (token == null) return {};
        return { Authorization: "Bearer " + token };
    }
}

export default ApiService;
