import React, { useEffect, useState } from "react";
import Placeholder from "../assets/images/placeholder_img.png";
import { FaHeartCirclePlus } from "react-icons/fa6";

export const ImageUpload: React.FC<ImageUploadProps> = ({
    getImage,
    initialValue,
    style,
}) => {
    const [imageSrc, setImageSrc] = useState<string>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result?.toString());
                getImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (initialValue || initialValue != "") {
            setImageSrc(initialValue);
        }
    }, [initialValue]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div id="img-container" className={`${style} m-2 w-fit rounded-lg`}>
                <img
                    src={imageSrc ? imageSrc : Placeholder}
                    className="h-full rounded-lg"
                    alt="Uploaded Preview"
                />
            </div>

            <label
                htmlFor="img"
                className=" font-extrabold border-feminine-secondary-dark tracking-wider text-white file-input-label border-2 p-4 cursor-pointer flex items-center gap-2 bg-purple-400 hover:bg-feminine-secondary-dark rounded-lg w-fit m-2"
            >
                <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <div className="flex items-center">
                    {imageSrc ? "edit image" : "add new image"}
                    <FaHeartCirclePlus className="text-feminine-primary-dark ml-2 text-3xl" />
                </div>
            </label>
        </div>
    );
};

interface ImageUploadProps {
    getImage(file: File): void;
    initialValue?: string;
    style?: string;
}
