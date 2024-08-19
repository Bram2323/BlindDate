/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                feminine: {
                    primary: "#f688c1",
                    "primary-dark": "#DB2777",
                    secondary: "#D8B4FE",
                    "secondary-dark": "#973AEC",
                },
                masculine: {
                    primary: "#58587d",
                    "primary-dark": "#34344A",
                    secondary: "#969c85",
                    "secondary-dark": "#7E846B",
                },
                nonbinary: {
                    primary: "#EDCB96",
                    "primary-dark": "#e3af5d",
                    secondary: "#14b4b2",
                    "secondary-dark": "#0E7C7B",
                },
            },
        },
    },
    plugins: [],
};
