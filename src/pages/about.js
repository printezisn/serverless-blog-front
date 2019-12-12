import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

export default () => (
    <Layout>
        <Helmet>
            <html lang="en" />
            <title>About | Edna Blog</title>
            <meta charset="utf-8" />
            <meta name="description" content="The about page of Edna Blog." />
        </Helmet>
        This is the about page.
    </Layout>
)
