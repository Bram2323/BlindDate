import React from "react";

export const Button: React.FC<ButtonProps> = ({
    content,
    style,
    handleClick,
}) => {
    const defaultStyle = "bg-emerald-600"; // TODO set default styling
    const styling = style === undefined ? defaultStyle : style;
    return (
        <>
            <button className={`${styling} border-2 p-2`} onClick={handleClick}>
                {content}
            </button>
        </>
    );
};

interface ButtonProps {
    content: string;
    style?: string;
    handleClick: () => void;
}

/**
 * Button is a React component that displays a button with customizable content and styling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.content - The text content displayed inside the button.
 * @param {string} [props.style] - Optional. The CSS class names for styling the button.
 * @param {() => void} props.handleClick - The function to handle click events on the button.
 *
 * @returns {JSX.Element} The Button component.
 */
