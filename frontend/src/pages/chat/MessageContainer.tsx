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
    const [opacity, setOpacity] = useState<number>(0.2);
    const [blur, setBlur] = useState<string>("blur(70px)");
    const [imageSrc, setImageSrc] = useState<string>();

    const getImage = () => {
        if (imageId == null) return;
        ApiService.get(`images/${imageId}`, null, "blob").then(
            (imageResponse) => {
                const imageUrl = URL.createObjectURL(imageResponse.data);
                setImageSrc(imageUrl);
            }
        );
    };

    useEffect(() => {
        getImage();
    }, [imageId]);

    useEffect(() => {
        const maxMsgToShowImg = 20;
        const showMoreByMsgAmount = 4;
        const minBlur = 0;
        const maxBlur = 70;
        const minOpacity = 0.2;
        const maxOpacity = 1;
        const steps = Math.min(
            Math.floor(messages.length / showMoreByMsgAmount),
            maxMsgToShowImg / showMoreByMsgAmount
        );
        const newBlur =
            maxBlur -
            (steps * (maxBlur - minBlur)) /
                (maxMsgToShowImg / showMoreByMsgAmount);
        const newOpacity =
            minOpacity +
            (steps * (maxOpacity - minOpacity)) /
                (maxMsgToShowImg / showMoreByMsgAmount);
        setBlur(`blur(${newBlur}px)`);
        setOpacity(newOpacity);
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
        <div className="h-full w-full overflow-hidden relative">
            <div
                className="h-full w-full overflow-hidden absolute"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: blur,
                    opacity: opacity,
                    zIndex: 1,
                }}
            ></div>
            <div
                className="absolute h-full w-full flex flex-col gap-1 overflow-y-auto p-2 "
                style={{ zIndex: 2 }}
            >
                {messageObjects}
                <AlwaysScrollToBottom />
            </div>
        </div>
    );
}

export default MessageContainer;
