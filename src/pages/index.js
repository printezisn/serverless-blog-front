import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

export default () => (
    <Layout>
        <Helmet>
            <html lang="en" />
            <title>Edna Blog</title>
            <meta charset="utf-8" />
            <meta
                name="description"
                content="The personal serverless blog of Nikos Printezis."
            />
        </Helmet>
        <h2>Hello world!</h2>
    </Layout>
)
