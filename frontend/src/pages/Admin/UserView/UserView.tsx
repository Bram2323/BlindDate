import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { IProfile } from "../../Profile/components/ProfileInterfaces";
import { ProfileView } from "../../Profile/ProfileView";
import { Button } from "../../../generic/Button";
import { useConfirm } from "../../../hooks/useConfirm";
import { User } from "../../../services/UserService";

function UserView() {
    const [user, setUser] = useState<User>();
    const [profile, setProfile] = useState<IProfile>();
    const [imageSrc, setImageSrc] = useState<string>("");
    const [exists, setExists] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [confirmElement, confirm] = useConfirm();

    useEffect(fetchProfile, []);

    function fetchProfile() {
        ApiService.get("profiles/" + id)
            .then((response) => {
                setProfile(response.data);
                ApiService.get(
                    "images/" + response.data.imageId,
                    null,
                    "blob"
                ).then((response) => {
                    setImageSrc(URL.createObjectURL(response.data));
                });
            })
            .catch((error) => {
                if (error.response.status == 404) setExists(false);
            });
        ApiService.get("users/" + id).then((response) => {
            setUser(response.data);
        });
    }

    function disableUser() {
        confirm(["Are you sure you want to disable this user?"], () => {
            ApiService.delete("users/" + id).then((response) =>
                setUser(response.data)
            );
        });
    }

    function enableUser() {
        confirm(["Are you sure you want to enable this user?"], () => {
            ApiService.post("users/" + id + "/enable", null).then((response) =>
                setUser(response.data)
            );
        });
    }

    return (
        <>
            <div className="relative w-full flex flex-col items-center">
                {user &&
                    user.role != "ROLE_ADMIN" &&
                    (user.enabled ? (
                        <Button
                            content="Disable"
                            handleClick={disableUser}
                            style="absolute top-4 left-4 z-30"
                        />
                    ) : (
                        <Button
                            content="Enable"
                            handleClick={enableUser}
                            style="absolute top-4 left-4 z-30"
                        />
                    ))}

                {exists ? (
                    <ProfileView
                        profile={profile}
                        imageSrc={imageSrc}
                        canEdit={false}
                    />
                ) : (
                    <p className="text-lg pt-4">No Profile!</p>
                )}
            </div>
            {confirmElement}
        </>
    );
}

export default UserView;
