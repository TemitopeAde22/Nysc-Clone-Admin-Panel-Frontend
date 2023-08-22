/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            fira: "Fira Sans",
            Belanosima: "Belanosima",
            Montserrat: "Montserrat",
            Roboto: "Roboto",
        },
    },
    plugins: [],
}