/** @type {import('tailwindcss').Config} */
export default {
    darkMode:'class',
    content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors:{
                theme:{
                    DEFAULT: 'rgb(52, 152, 166)',
                },
                'white':'var(--color-bg-white)',
            }
        }
    },
    plugins: []
}
