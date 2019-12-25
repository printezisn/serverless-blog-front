import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Markdown from "../components/markdown"

export default class Post extends React.Component {
    render() {
        const post = this.props.pageContext.post

        return (
            <Layout>
                <Helmet>
                    <html lang="en" />
                    <title>{post.title} | Edna Blog</title>
                    <meta charset="utf-8" />
                    <meta name="description" content={post.description} />
                </Helmet>
                <article>
                    <header>
                        <h2 className="title is-4 has-text-centered">
                            {post.title}
                        </h2>
                    </header>
                    <section className="blog-post">
                        <Markdown text={post.body}></Markdown>
                    </section>
                </article>
            </Layout>
        )
    }
}
