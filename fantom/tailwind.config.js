/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                Climate: ['Climate Crisis'],
                Kanit: ['Kanit'],
                Space: ['Space Grotesk']
            }
        },
    },
    plugins: [],
}


// font-family: 'Climate Crisis', cursive;
// font-family: 'Kanit', sans-serif;
// font-family: 'Space Grotesk', sans-serif;