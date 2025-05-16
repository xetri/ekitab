import type { Config } from "tailwindcss";

const config : Config = {
    content: [
      "./index.html",
      "./src/**/*.{jsx,tsx}",
      "./src/components/**/*.{jsx,tsx}",
      "./src/components/pages/**/*.{jsx,tsx}",
      "./src/components/ui/**/*.{jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};

export default config;