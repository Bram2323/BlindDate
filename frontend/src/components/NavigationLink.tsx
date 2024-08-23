import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/UserService";

export const NavigationLink: React.FC<NavigationLinkProps> = ({
    label,
    url,
    logoutUser,
    colspan,
    hideAfterNav,
}) => {
    const navigate = useNavigate();
    return (
        <li
            className={`${colspan} text-xl bg-pink-400 hover:bg-pink-600 font-bold py-2 px-4 mx-4 my-4 rounded flex items-center justify-center cursor-pointer`}
            onClick={() => {
                if (logoutUser) {
                    logout();
                }
                navigate(url);
                if (hideAfterNav != undefined) hideAfterNav();
            }}
        >
            {label}
        </li>
    );
};

interface NavigationLinkProps {
    label: string;
    url: string;
    logoutUser?: boolean;
    colspan?: string;
    hideAfterNav?: () => void;
}
