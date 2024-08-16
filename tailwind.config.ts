import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#FCFAFB',           
          heading: '#2E2E2E',           
          text: '#383838',              
          secondaryBg: '#E5E9F0',     
          secondaryText: '#9A8FF7',     
          accentLight: '#C4C4C4',      
          accentMedium: '#5A2EFF',      
          accentDark: '#4B4BFF', 
          buttonDefault: '#5b3095', 
          buttonHover: '#7C4DFF',   
          buttonActive: '#4B1FE7',  
          buttonDisabled: '#9A8FF7',       
          linkDefault: '#5A2EFF',       
          linkHover: '#4B4BFF',         
          linkActive: '#383838',     
          linkVisited: '#2E2E2E',     
        },
        dark: {
          primary: '#2E2E2E',           
          heading: '#FCFAFB',          
          text: '#E5E9F0',             
          secondaryBg: '#383838',      
          secondaryText: '#C4C4C4',   
          accentLight: '#9A8FF7',       
          accentMedium: '#5A2EFF',     
          accentDark: '#4B4BFF', 
          buttonDefault: '#5b3095', 
          buttonHover: '#7C4DFF',   
          buttonActive: '#4B1FE7',  
          buttonDisabled: '#9A8FF7',        
          linkDefault: '#9A8FF7',       
          linkHover: '#FCFAFB',        
          linkActive: '#5A2EFF',        
          linkVisited: '#4B4BFF',      
        },
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.5s ease',
      },
      fontFamily: {
        literata: ['Literata', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dancingScript: ['Dancing Script', 'cursive'],
        playfairDisplay: ['Playfair Display', 'serif'],
        greatVibes: ['Great Vibes', 'cursive'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        '3xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
