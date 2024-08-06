import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

export const ProfileView = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        ApiService.get("profiles/my")
            .then((response) => {
                setProfile(response.data);
                console.log(response.data);
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
                    {imageSrc && profile && (
                        <div>
                            <h3>{profile.username}</h3>
                            <img
                                src={`${imageSrc}`}
                                alt={`Profile picture of ${profile.username}`}
                            />
                            <p>{profile.description}</p>
                            <p>I am a {profile.gender}</p>
                            <p>I am looking for a {profile.lookingForGender}</p>
                            <h2>Sexuality</h2>
                            <ul>
                                {profile.sexualities.map((sexuality) => (
                                    <li key={sexuality.id}>{sexuality.name}</li>
                                ))}
                            </ul>
                            <h2>Interests</h2>
                            <ul>
                                {profile.interests.map((interest) => (
                                    <li className="border-2" key={interest.id}>
                                        {interest.name}
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                {profile.traits.map((trait) => (
                                    <li className={"border-2"} key={trait.id}>
                                        <p>{trait.trait.question}</p>
                                        <p>{trait.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
interface List {
    id: number;
    name: string;
}

interface Profile {
    id: number;
    username: string;
    description: string;
    gender: string;
    lookingForGender: string;
    sexualities: List[];
    interests: List[];
    imageId: number;
}
