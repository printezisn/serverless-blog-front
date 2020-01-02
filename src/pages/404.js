import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

export default () => (
    <Layout>
        <Helmet>
            <html lang="en" />
            <title>Page Not Found | Edna Blog</title>
            <meta charset="utf-8" />
            <meta
                name="description"
                content="The page was not found in Edna Blog."
            />
        </Helmet>
        <article className="has-text-centered">
            <p className="has-text-warning">
                <i className="fa fa-9x fa-exclamation has-text-warning"></i>
            </p>
            <header>
                <h2 className="title is-2">Page Not Found</h2>
            </header>
            <p>The page you requested was not found.</p>
        </article>
    </Layout>
)
