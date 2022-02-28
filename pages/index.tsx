import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import React from "react";
import Editor from "../components/Editor";
import { FontsAPIObject } from "opendocs-fonts-api";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const fonts = (await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.G_FONTS_API_KEY || ""}`)).data;
    return {
        props: {
            fonts
        }
    };
};

const Home = ({ fonts }: InferGetServerSidePropsType<typeof getServerSideProps> & { fonts: FontsAPIObject }) => {
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
                <Editor fonts={fonts} />
            </div>
        </div>
    );
};

export default Home;
