import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
/* Base */
* {
    padding: 0;
    margin: 0;
}
body {
    font-family: sans-serif;
}
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-track {
    background-color: rgba(241, 241, 241, 1);
}
::-webkit-scrollbar-thumb {
    background-color: rgba(179, 179, 179);
    border-radius: 8px;
    cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgba(100, 100, 100);
    cursor: pointer;
}

/* ----------------------------- OpenDyslexic 3 ----------------------------- */

@font-face {
    font-family: "OpenDyslexic Three";
    src: url("/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "OpenDyslexic Three";
    src: url("/fonts/OpenDyslexic3-Bold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
}

/* ----------------------------- OpenDyslexic 2 ----------------------------- */

@font-face {
    font-family: "OpenDyslexic Two";
    src: url("/fonts/OpenDyslexic-Regular.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "OpenDyslexic Two";
    src: url("/fonts/OpenDyslexic-Bold.otf") format("opentype");
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: "OpenDyslexic Two";
    src: url("/fonts/OpenDyslexic-BoldItalic.otf") format("opentype");
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: "OpenDyslexic Two";
    src: url("/fonts/OpenDyslexic-Italic.otf") format("opentype");
    font-weight: normal;
    font-style: italic;
}

/* ----------------------------- OpenDyslexic Alta ----------------------------- */

@font-face {
    font-family: "OpenDyslexic Alta";
    src: url("/fonts/OpenDyslexicAlta-Regular.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "OpenDyslexic Alta";
    src: url("/fonts/OpenDyslexicAlta-Bold.otf") format("opentype");
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: "OpenDyslexic Alta";
    src: url("/fonts/OpenDyslexicAlta-BoldItalic.otf")
        format("opentype");
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: "OpenDyslexic Alta";
    src: url("/fonts/OpenDyslexicAlta-Italic.otf") format("opentype");
    font-weight: normal;
    font-style: italic;
}

/* ----------------------------- OpenDyslexic Mono ----------------------------- */

@font-face {
    font-family: "OpenDyslexic Mono";
    src: url("/fonts/OpenDyslexicMono-Regular.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
}
`;

export const LightMode = createGlobalStyle`
html {
    background-color: #f1f1f1;
    min-height: 100vh;
    color: white;
}
`;

export const DarkMode = createGlobalStyle`
html {
    background-color: #1f2120;
    min-height: 100vh;
    color: white;
}
`;

export const DyslexicMode = createGlobalStyle`
/* ----------------------------- Dyslexia Mode ----------------------------- */

.tox {
    font-family: "OpenDyslexic Two" !important;
}

.tox > * {
    font-family: "OpenDyslexic Two" !important;
}

`;
