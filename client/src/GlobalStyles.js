import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

:root{
    --color-cream: "#F6F2EE";
    --color-dark-cream: "#EFE8E1";
    --color-white: "FFFFFF";
    --color-white: "000000";
    --color-green: "#178080";
    --font-poppins: "Poppins";
    --font-ubuntu: "Ubuntu";
}

body{
    font-family: var(--font-poppins), sans-serif;
    font-weight: 400;
    margin: 0;
}
`;

export default GlobalStyles;
