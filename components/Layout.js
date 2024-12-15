import React from 'react';
import Head from "next/head";
import Header from "../components/Header";


const Layout = ({children}) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Список задач</title>
            </Head>
            <Header/>
                {children}
        </>
    )
};

export default Layout;
