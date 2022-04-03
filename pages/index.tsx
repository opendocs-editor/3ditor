import Head from "next/head";
import React, { Dispatch, SetStateAction } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Editor from "../components/Editor";
import styles from "../styles/Home.module.css";
import { Theme } from "../utils/types";

const Home = ({
    theme,
    setTheme,
}: {
    theme?: Theme;
    setTheme?: Dispatch<SetStateAction<Theme>>;
}) => {
    return (
        <div
            className={styles.container}
            style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}
        >
            <Head>
                <title>3ditor Demo</title>
                <meta
                    name="description"
                    content="3ditor: The open-source multiplatform React-based editor that powers OpenDocs."
                />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <div
                className={styles.app}
                style={{
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                }}
            >
                <GrammarlyEditorPlugin
                    config={{ collectUserFeedback: true }}
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Editor theme_={theme} setTheme_={setTheme} />
                </GrammarlyEditorPlugin>
            </div>
        </div>
    );
};

export default Home;
