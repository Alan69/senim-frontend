/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: "576px",
            // => @media (min-width: 576px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "992px",
            // => @media (min-width: 992px) { ... }

            xl: "1200px",
            // => @media (min-width: 1200px) { ... }

            xxl: "1400px",
            // => @media (min-width: 1400px) { ... }
        },
        extend: {
            fontFamily: {
                // Add your custom fonts
                dmSans: ["DM Sans", "sans-serif"],
                clashDisplay: ["Clash Display", "sans-serif"],
                raleway: ["Raleway", "sans-serif"],
                spaceGrotesk: ["Space Grotesk", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },

            colors: {
                colorCodGray: "#191919",
                colorMainPurple: "#8D9CFC",
                colorLinenRuffle: "#EFEAE3",
                colorViolet: "#321CA4",
                colorGreen: "#39FF14",
            },
        },
    },
    plugins: [],
}