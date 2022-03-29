// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeContext } from "styled-components";
import {
    DarkMode,
    DyslexicMode,
    GlobalStyles,
    LightMode,
} from "../styles/theme";
import { Theme } from "../utils/types";

function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<Theme>("light");

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            <GlobalStyles />
            {theme == "light" ? <LightMode /> : <></>}
            {theme == "dark" ? <DarkMode /> : <></>}
            {theme == "light-dyslexic" ? <DyslexicMode /> : <></>}
            {theme == "dark-dyslexic" ? <DyslexicMode /> : <></>}
            <Component {...pageProps} theme={theme} setTheme={setTheme} />
        </ThemeContext.Provider>
    );
}

export default MyApp;
