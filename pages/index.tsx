import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Editor from "../components/Editor";

const Home = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>3ditor Demo</title>
                <meta
                    name="description"
                    content="3ditor: The open-source multiplatform React-based editor that powers OpenDocs."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.app}>
                <Editor />
            </div>
        </div>
    );
};

export default Home;
