import React from "react"
import { Helmet } from "react-helmet"
import { Location } from "@reach/router"
import queryString from "query-string"

import Layout from "../../components/layout"
import { PostLoader } from "../../components/post"
import Markdown from "../../components/markdown"
import MessageBox from "../../components/messageBox"
import LoadingButton from "../../components/loadingButton"

import { postAPI } from "../../api/postAPI"

export default () => (
    <Location>
        {({ location }) => {
            if (!location.search) {
                return ""
            }

            const { id } = queryString.parse(location.search)
            return <InternalDelete id={id}></InternalDelete>
        }}
    </Location>
)

class InternalDelete extends React.Component {
    state = {
        isLoading: false,
        errors: [],
        successMessages: [],
    }

    constructor(props) {
        super(props)

        this.renderDeletePost = this.renderDeletePost.bind(this)
        this.deletePost = this.deletePost.bind(this)
    }

    async deletePost(post) {
        const state = {
            isLoading: false,
            errors: [],
            successMessages: [],
        }

        this.setState({ isLoading: true })
        const response = await postAPI.deletePost(post.id)
        this.setState({ isLoading: false })

        if (response.StatusCode === 404) {
            state.errors.push("The blog post you requested was not found.")
        } else if (response.StatusCode !== 200) {
            state.errors.push("An error occurred. Please try again later.")
        } else {
            state.successMessages.push("The post was deleted successfully!")
        }

        this.setState(state)
    }

    renderDeletePost(post) {
        return (
            <article>
                <header>
                    <h2 className="title is-3">{post.title}</h2>
                </header>
                <MessageBox isForErrors={true} messages={this.state.errors} />
                <MessageBox
                    isForErrors={false}
                    messages={this.state.successMessages}
                />
                <section className="markdown">
                    <Markdown text={post.body}></Markdown>
                </section>
                <br />
                <footer>
                    <LoadingButton
                        type="button"
                        className="button is-danger"
                        isLoading={this.state.isLoading}
                        onClick={() => this.deletePost(post)}
                    >
                        <i className="fas fa-trash-alt"></i>
                        &nbsp; Delete
                    </LoadingButton>
                </footer>
            </article>
        )
    }

    render() {
        return (
            <Layout compact={true}>
                <Helmet>
                    <html lang="en" />
                    <title>Delete Post | Edna Blog</title>
                    <meta charset="utf-8" />
                    <meta
                        name="description"
                        content="Delete a blog post in Edna Blog."
                    />
                </Helmet>
                <PostLoader
                    id={this.props.id}
                    onRender={this.renderDeletePost}
                ></PostLoader>
            </Layout>
        )
    }
}
