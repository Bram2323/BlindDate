import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

export const ProfileView = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        ApiService.get("profiles/my")
            .then((response) => {
                console.log(response);
                setProfile(response.data);
                ApiService.get(
                    `images/${response.data.imageId}`,
                    null,
                    "blob"
                ).then((response) => {
                    if (response.data instanceof Blob) {
                        const url = URL.createObjectURL(response.data);
                        setImageSrc(url);
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            {profile && (
                <div id="image-container">
                    <h3>My Profile</h3>
                    {imageSrc && (
                        <img src={`${imageSrc}`} alt="Profile picture" />
                    )}
                </div>
            )}
        </div>
    );
};
interface Profile {}
