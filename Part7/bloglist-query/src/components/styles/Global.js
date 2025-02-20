import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    body {
        font-family: 'Poppins', sans-serif;
        font-size: 1.15em;
        margin:0;
        background-color:${({ theme }) => theme.colors.body}
    }

    body::-webkit-scrollbar {
        display: none;
    }
    `
export default GlobalStyles
