import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Markdown from "../components/markdown"

export default ({ pageContext: { post } }) => (
    <Layout compact={true}>
        <Helmet>
            <html lang="en" />
            <title>{post.title} | Edna Blog</title>
            <meta charset="utf-8" />
            <meta name="description" content={post.description} />
        </Helmet>
        <article>
            <header>
                <h2 className="title is-3">{post.title}</h2>
            </header>
            <section className="markdown">
                <Markdown text={post.body}></Markdown>
            </section>
        </article>
    </Layout>
)
