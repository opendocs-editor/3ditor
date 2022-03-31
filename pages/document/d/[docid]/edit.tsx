import Head from "next/head";
import React, { Dispatch, SetStateAction } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import axios from "axios";
import Editor from "../../../../components/Editor";
import styles from "../../../../styles/Home.module.css";
import { Theme } from "../../../../utils/types";
import { useRouter } from "next/router";
import {
    DarkEditorMode,
    GlobalEditorStyles,
    LightEditorMode,
} from "styles/3ditor";
import { DarkMode, LightMode } from "styles/theme";

const parseSearch = (query: string): { [key: string]: string } => {
    const split = query.split("&");
    const obj: { [key: string]: string } = {};
    split.forEach((s) => {
        const split_ = s.split("=");
        split_[0] = split_[0].replace("?", "");
        split_.shift();
        const str = split_.join("=");
        obj[split_[0]] = str;
    });
    return obj;
};

const Edit = ({
    theme_,
    setTheme_,
}: {
    theme_?: Theme;
    setTheme_?: Dispatch<SetStateAction<Theme>>;
}) => {
    const [document, setDocument] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [theme, setTheme] = React.useState<Theme>(theme_ || "light");
    const router = useRouter();
    const docid = router.query.docid;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        axios
            .get(
                `${window.location.protocol}//${window.location.hostname}/api/v1/editor/document/${router.query.docid}`
            )
            .then((resp) => {
                setDocument(resp.data.content);
                setIsLoading(false);
            })
            .catch((e) => {
                alert(`An error occured while loading the document: ${e}`);
            });
        const t = window.localStorage.getItem("theme");
        if (t) {
            setTheme(t as Theme);
            if (setTheme_) setTheme_(t as Theme);
        }
    });

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
                <GlobalEditorStyles />
                {theme == "dark" || theme == "dark-dyslexic" ? (
                    <>
                        <DarkEditorMode />
                        <DarkMode />
                    </>
                ) : (
                    <>
                        <LightEditorMode />
                        <LightMode />
                    </>
                )}
                <GrammarlyEditorPlugin
                    config={{ collectUserFeedback: true }}
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {isLoading ? (
                        <div
                            className="loader_container2"
                            style={{
                                display: isLoading ? "flex" : "none",
                            }}
                        >
                            <div className="loader2" />
                        </div>
                    ) : (
                        <Editor
                            documentContent={document || ""}
                            documentId={docid?.toString() || ""}
                            theme_={theme_}
                            setTheme_={setTheme_}
                        />
                    )}
                </GrammarlyEditorPlugin>
            </div>
        </div>
    );
};

export default Edit;
