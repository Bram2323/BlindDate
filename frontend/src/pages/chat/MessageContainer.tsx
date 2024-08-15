import { useEffect, useRef, useState } from "react";
import { User } from "../../services/UserService";
import Message from "./Message";
import ApiService from "../../services/ApiService";

interface MessageContainerProps {
    messages: any;
    rightUser: User;
    imageId: number;
}

function MessageContainer({
    messages,
    rightUser,
    imageId,
}: MessageContainerProps) {
    const messageObjects = messages.map((message: any, index: number) => (
        <Message key={index} message={message} rightUser={rightUser} />
    ));
    const [opacity, setOpacity] = useState<number>(0);
    const [blur, setBlur] = useState<string>("blur(100px)");
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {}, [messages]);

    const getImage = () => {
        ApiService.get(`images/${imageId}`, null, "blob").then(
            (imageResponse) => {
                const imageUrl = URL.createObjectURL(imageResponse.data);
                setImageSrc(imageUrl);
            }
        );
    };
    useEffect(() => {
        getImage();
    }, []);
    useEffect(() => {
        if (messages.length > 50) {
            setOpacity(1);
            setBlur("blur(0px)");
        } else if (messages.length > 40) {
            setOpacity(0.8);
            setBlur("blur(20px)");
        } else if (messages.length > 30) {
            setOpacity(0.6);
            setBlur("blur(40px)");
        } else if (messages.length > 20) {
            setOpacity(0.4);
            setBlur("blur(60px)");
        } else if (messages.length > 10) {
            setOpacity(0.2);
            setBlur("blur(80px)");
        } else {
            setOpacity(0.0);
            setBlur("blur(100px)");
        }
    }, [messages]);

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            if (elementRef.current) {
                elementRef.current.scrollIntoView();
            }
        }, [messages]);

        return <div ref={elementRef} />;
    };

    return (
        <div className="relative h-full w-full">
            <div
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: blur,
                    opacity: opacity,
                }}
                className="absolute inset-0 z-0 border-x-2 border-gray-500"
            ></div>

            <div className=" relative h-full w-full flex flex-col gap-1 overflow-y-auto p-2">
                {messageObjects}
                <AlwaysScrollToBottom />
            </div>
        </div>
    );
}

export default MessageContainer;
