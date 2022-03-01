import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import React from "react";
import Editor from "../components/Editor";
import { FontList, FontsAPIObject } from "opendocs-fonts-api";

export const getStaticProps: GetStaticProps = async (context) => {
    const fonts = (await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.G_FONTS_API_KEY || ""}`)).data;
    const f_ = new FontList(fonts);
    return {
        props: {
            fonts,
            names: f_.names()
        }
    };
};

const Home = ({ fonts, names }: { fonts: FontsAPIObject, names: string[] }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>3ditor Demo</title>
                <meta
                    name="description"
                    content="3ditor: The open-source multiplatform React-based editor that powers OpenDocs."
                />
                <link rel="icon" href="/favicon.ico" />
                { names.map((i) => {
                    return <link href={`https://fonts.googleapis.com/css?family=${i}`} rel="stylesheet" type="text/css" />;
                }) }
            </Head>

            <div className={styles.app}>
                <Editor fonts={fonts} />
            </div>
        </div>
    );
};

export default Home;
