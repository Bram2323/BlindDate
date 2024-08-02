import React, { useEffect, useState } from "react";

export const ImageUpload: React.FC<ImageUploadProps> = ({ getImage }) => {
    const [imageSrc, setImageSrc] = useState<string>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                getImage(file);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {}, []);

    return (
        <div>
            <div id="img-container" className="border-2 min-h-48">
                {imageSrc ? (
                    <img src={imageSrc.toString()} />
                ) : (
                    <p>No image selected</p>
                )}
            </div>
            <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={handleImageChange}
            ></input>
        </div>
    );
};

interface ImageUploadProps {
    getImage(file: File): void;
}