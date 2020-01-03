import React from "react"
import { Helmet } from "react-helmet"
import { Location } from "@reach/router"
import queryString from "query-string"

import Layout from "../../components/layout"
import { PostLoader, EditPost } from "../../components/post"

export default () => (
    <Location>
        {({ location }) => {
            if (!location.search) {
                return ""
            }

            const { id } = queryString.parse(location.search)
            return <InternalEdit id={id}></InternalEdit>
        }}
    </Location>
)

class InternalEdit extends React.Component {
    constructor(props) {
        super(props)

        this.renderEditPost = this.renderEditPost.bind(this)
    }

    renderEditPost(post) {
        return <EditPost post={post}></EditPost>
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <html lang="en" />
                    <title>
                        {`Edit Post | ${process.env.GATSBY_EDNABLOG_SITE_TITLE}`}
                    </title>
                    <meta charset="utf-8" />
                    <meta
                        name="description"
                        content={`Edit a blog post in ${process.env.GATSBY_EDNABLOG_SITE_TITLE}`}
                    />
                </Helmet>
                <article>
                    <header>
                        <h2 className="title is-3 has-text-centered">
                            Edit Post
                        </h2>
                    </header>
                    <PostLoader
                        id={this.props.id}
                        onRender={this.renderEditPost}
                    ></PostLoader>
                </article>
            </Layout>
        )
    }
}
