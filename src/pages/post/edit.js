import React from "react"
import { Helmet } from "react-helmet"
import { Router } from "@reach/router"

import Layout from "../../components/layout"
import { PostLoader, EditPost } from "../../components/post"

export default () => (
    <Router>
        <InternalEdit path="/post/edit/:id"></InternalEdit>
    </Router>
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
                    <title>Edit Post | Edna Blog</title>
                    <meta charset="utf-8" />
                    <meta
                        name="description"
                        content="Edit a blog post in Edna Blog."
                    />
                </Helmet>
                <PostLoader
                    id={this.props.id}
                    onRender={this.renderEditPost}
                ></PostLoader>
            </Layout>
        )
    }
}
