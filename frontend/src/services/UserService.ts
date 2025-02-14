import { useEffect, useState } from "react";
import ApiService from "./ApiService";

export const USER_STORAGE_LOCATION = "USER";

class UserService {
    static login(username: string, password: string) {
        return this.#requestToken("auth/login", { username, password });
    }

    static register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        return this.#requestToken("auth/register", {
            username,
            firstName,
            lastName,
            email,
            password,
        });
    }

    static #requestToken(url: string, data: any) {
        return ApiService.post(url, data)
            .then((response) => {
                const data = response.data;

                this.#setToken(data.token);
                this.#setUser(data.user);

                const event = new CustomEvent("login", {
                    detail: { user: data.user },
                });
                window.dispatchEvent(event);

                return Promise.resolve({
                    succes: true,
                    user: data.user,
                });
            })
            .catch((error) => {
                throw error.response.data.detail;
            });
    }

    static #setToken(token: string) {
        ApiService.setToken(token);
    }

    static #setUser(user: any) {
        sessionStorage.setItem(USER_STORAGE_LOCATION, JSON.stringify(user));
    }

    static logout() {
        ApiService.removeToken();
        sessionStorage.removeItem(USER_STORAGE_LOCATION);
        window.dispatchEvent(new Event("logout"));
    }

    static isLoggedIn() {
        return ApiService.getToken() !== null;
    }

    static getUser(): User {
        let userString = sessionStorage.getItem(USER_STORAGE_LOCATION);
        if (userString === null) return defaultUser;
        return JSON.parse(userString);
    }
}

export function login(username: string, password: string) {
    return UserService.login(username, password);
}

export function register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
) {
    return UserService.register(username, firstName, lastName, email, password);
}

export const logout = UserService.logout;

export function useUser(): [User, boolean] {
    const [user, setUser] = useState<User>(UserService.getUser());
    const [loggedIn, setLoggedIn] = useState(UserService.isLoggedIn());

    useEffect(() => {
        function handleLogin(e: any) {
            setUser(e.detail.user);
            setLoggedIn(true);
        }
        function handleLogout() {
            setUser(defaultUser);
            setLoggedIn(false);
        }
        window.addEventListener("login", handleLogin);
        window.addEventListener("logout", handleLogout);
        return () => {
            window.removeEventListener("login", handleLogin);
            window.removeEventListener("logout", handleLogout);
        };
    }, []);

    return [user, loggedIn];
}

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    id: string;
    enabled: boolean;
}

const defaultUser: User = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    id: "",
    enabled: true,
};
