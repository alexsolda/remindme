import { keyframes } from "@emotion/react";

export const animateOnRender = keyframes`
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`

export const animateOpacity = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`