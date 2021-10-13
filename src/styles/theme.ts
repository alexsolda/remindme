import {extendTheme} from '@chakra-ui/react';

export const theme = extendTheme({
    transition: {
        customHover: {
            duration: '0.5s',
            easing: 'ease-in-out'
        }
    },
    colors: {
        gray: {
            "900": '#1A1D23',
            "600": '#282A2F',
            "50": '#DDDDDD'
        },
        white: {
            "900": '#FFFFFF'
        },
        blue: {
            "500": '#48FFE9'
        },
        green: {
            "500": '#48FF86'
        },
        yellow: {
            "500": '#FBFF48'
        },
        red: {
            "500": '#FF4848'
        }
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins'  
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white.900'
            }
        }
    }
})