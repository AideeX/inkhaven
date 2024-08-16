import { Literata, Montserrat, Dancing_Script, Playfair_Display, Great_Vibes } from 'next/font/google';
 
export const literata = Literata({ subsets: ['latin'] });

export const montserrat = Montserrat({ 
    weight: ['400', '700'],
    subsets: ['latin'] 
});

export const dancingScript = Dancing_Script({
        weight: ['400', '700'],
        subsets: ['latin', 'latin-ext'],
});

export const playfairDisplay = Playfair_Display({
    weight: ['400', '700'],
    subsets: ['latin', 'latin-ext'],
})
export const greatVibes = Great_Vibes({
    weight: '400',
    subsets: ['latin', 'latin-ext'],
})

