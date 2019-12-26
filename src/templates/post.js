import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Markdown from "../components/markdown"

export default ({ pageContext: { post, siteUrl, pagePath } }) => (
    <Layout compact={true}>
        <Helmet>
            <html lang="en" />
            <title>{post.title} | Edna Blog</title>
            <meta charset="utf-8" />
            <meta name="description" content={post.description} />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />
            <meta name="og:title" content={post.title + " | Edna Blog"} />
            <meta name="og:description" content={post.description} />
            <meta name="og:url" content={siteUrl + "post/read/" + post.id} />
            <meta name="og:site_name" content="Edna Blog" />
        </Helmet>
        <article>
            <header>
                <h2 className="title is-3">{post.title}</h2>
            </header>
            <section className="markdown">
                <Markdown text={post.body}></Markdown>
            </section>
            <br />
            <footer>
                <Link to={pagePath} className="button">
                    <i className="fas fa-arrow-left"></i>
                    &nbsp; Back
                </Link>
            </footer>
        </article>
    </Layout>
)
