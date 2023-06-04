import React from "react";

import Head from "next/head";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>React ts-library-template demo</title>
        </Head>
        <Component {...pageProps} />
    </>
);

export default MyApp;
