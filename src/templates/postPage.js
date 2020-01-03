import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Layout from "../components/layout"

export default class PostPage extends React.Component {
    render() {
        const siteUrl = this.props.pageContext.siteUrl
        const posts = this.props.pageContext.page.map(post => (
            <div className="box" key={post.id}>
                <article>
                    <header>
                        <h2 className="title is-4">{post.title}</h2>
                    </header>
                    <section>
                        <p>{post.description}</p>
                    </section>
                    <br />
                    <footer>
                        <Link to={"/post/read/" + post.id} className="button">
                            Read More &nbsp;
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </footer>
                </article>
            </div>
        ))
        const prevPage = !this.props.pageContext.prevPagePath ? (
            ""
        ) : (
            <Link
                to={this.props.pageContext.prevPagePath}
                className="button is-pulled-left"
            >
                <i className="fas fa-arrow-left"></i>
                &nbsp; Newer Posts
            </Link>
        )
        const nextPage = !this.props.pageContext.nextPagePath ? (
            ""
        ) : (
            <Link
                to={this.props.pageContext.nextPagePath}
                className="button is-pulled-right"
            >
                Older Posts &nbsp; <i className="fas fa-arrow-right"></i>
            </Link>
        )

        return (
            <Layout compact={true}>
                <Helmet>
                    <html lang="en" prefix="og: http://ogp.me/ns#" />
                    <title>{process.env.GATSBY_EDNABLOG_SITE_TITLE}</title>
                    <meta charset="utf-8" />
                    <meta
                        name="description"
                        content={process.env.GATSBY_EDNABLOG_SITE_DESCRIPTION}
                    />
                    <meta
                        name="author"
                        content={process.env.GATSBY_EDNABLOG_AUTHOR}
                    />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:title"
                        content={process.env.GATSBY_EDNABLOG_SITE_TITLE}
                    />
                    <meta
                        property="og:description"
                        content={process.env.GATSBY_EDNABLOG_SITE_DESCRIPTION}
                    />
                    <meta property="og:url" content={siteUrl} />
                    <meta property="og:image" content={siteUrl + "site.jpg"} />
                    <meta property="og:image:type" content="image/jpeg" />
                    <meta property="og:image:width" content="400" />
                    <meta property="og:image:height" content="400" />
                    <meta
                        property="og:site_name"
                        content={process.env.GATSBY_EDNABLOG_SITE_TITLE}
                    />
                </Helmet>
                {posts}
                <div className="clearfix">
                    {prevPage}
                    {nextPage}
                </div>
                <div className="clearfix"></div>
            </Layout>
        )
    }
}
