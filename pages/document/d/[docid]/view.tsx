import Head from "next/head";
import React, { Dispatch, SetStateAction } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import Editor from "../../../../components/Editor";
import styles from "../../../../styles/Home.module.css";
import { Theme } from "../../../../utils/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let document = "";
    const r_ = await axios.get(
        `${window.location.protocol}//${window.location.host}/api/v1/editor/document/${context.query.docid}`
    );
    const resp = r_.data;
    if (resp.content) document = resp.content;
    return {
        props: {
            document,
            docid: context.query.docid,
        },
    };
};

const Edit = ({
    document,
    docid,
    theme,
    setTheme,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
    theme?: Theme;
    setTheme?: Dispatch<SetStateAction<Theme>>;
}) => {
    return (
        <div
            className={styles.container}
            style={{ width: "100%;", height: "100%", margin: 0, padding: 0 }}
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
                <link rel="stylesheet" href="/custom.css" />
            </Head>

            <div
                className={styles.app}
                style={{
                    width: "100%;",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                }}
            >
                <GrammarlyEditorPlugin
                    config={{ collectUserFeedback: true }}
                    style={{
                        width: "100%;",
                        height: "100%",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Editor
                        documentContent={document || ""}
                        documentId={docid || ""}
                        theme_={theme}
                        setTheme_={setTheme}
                        readOnly={true}
                    />
                </GrammarlyEditorPlugin>
            </div>
        </div>
    );
};

export default Edit;
