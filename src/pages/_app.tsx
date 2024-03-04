import React from "react";

import Head from "next/head";

import type { AppProps } from "next/app";

import { InputDeviceProvider } from "../useInputDevice.js";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>@ezez/hooks</title>
        </Head>
        <InputDeviceProvider>
            <Component {...pageProps} />
        </InputDeviceProvider>
    </>
);

export default MyApp;
