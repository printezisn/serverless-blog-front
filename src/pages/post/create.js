import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import { EditPost } from "../../components/post"

export default () => (
    <Layout>
        <Helmet>
            <html lang="en" />
            <title>{`New Post | ${process.env.GATSBY_EDNABLOG_SITE_TITLE}`}</title>
            <meta charset="utf-8" />
            <meta
                name="description"
                content={`Create a new blog post in ${process.env.GATSBY_EDNABLOG_SITE_TITLE}.`}
            />
        </Helmet>
        <article>
            <header>
                <h2 className="title is-3 has-text-centered">New Post</h2>
            </header>
            <EditPost />
        </article>
    </Layout>
)
