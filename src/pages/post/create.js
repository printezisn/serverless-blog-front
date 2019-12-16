import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import MarkdownModal from "../../components/markdownModal"
import MessageBox from "../../components/messageBox"
import LoadingButton from "../../components/loadingButton"

import { postAPI } from "../../api/postAPI"

export default class Create extends React.Component {
    state = {
        id: "",
        title: "",
        description: "",
        body: "",
        errors: [],
        successMessages: [],
        isPreviewOpen: false,
        isLoading: false,
    }

    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)
        this.openPreview = this.openPreview.bind(this)
        this.closePreview = this.closePreview.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async submit(e) {
        e.preventDefault()

        const post = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
            revision: 1,
        }

        this.setState({ isLoading: true })
        const response = await postAPI.createPost(post)
        this.setState({ isLoading: false })

        if (response.errors.length > 0) {
            this.setState({ errors: response.errors, successMessages: [] })
        } else if (response.StatusCode !== 200) {
            this.setState({
                errors: ["An unexpected error occurred"],
                successMessages: [],
            })
        } else {
            this.setState({
                errors: [],
                successMessages: ["The post was created successfully!"],
            })
        }
    }

    openPreview() {
        this.setState({ isPreviewOpen: true })
    }

    closePreview() {
        this.setState({ isPreviewOpen: false })
    }

    handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value

        this.setState({ [name]: value })
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <html lang="en" />
                    <title>New Post | Edna Blog</title>
                    <meta charset="utf-8" />
                    <meta
                        name="description"
                        content="Create a new blog post in Edna Blog."
                    />
                </Helmet>
                <article>
                    <header>
                        <h2 className="title is-4 has-text-centered">
                            New Post
                        </h2>
                    </header>
                    <MessageBox
                        isForErrors={false}
                        messages={this.state.successMessages}
                    />
                    <MessageBox
                        isForErrors={true}
                        messages={this.state.errors}
                    />
                    <form className="small-form" onSubmit={this.submit}>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal required-label">
                                <label className="label" htmlFor="post-id">
                                    ID
                                </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            id="post-id"
                                            name="id"
                                            className="input"
                                            type="text"
                                            placeholder="The ID of the post."
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal required-label">
                                <label className="label" htmlFor="post-title">
                                    Title
                                </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            id="post-title"
                                            name="title"
                                            className="input"
                                            type="text"
                                            placeholder="The title of the post."
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal required-label">
                                <label
                                    className="label"
                                    htmlFor="post-description"
                                >
                                    Description
                                </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <textarea
                                            id="post-description"
                                            name="description"
                                            className="textarea"
                                            rows="5"
                                            placeholder="The description of the post."
                                            onChange={this.handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal required-label">
                                <label className="label" htmlFor="post-body">
                                    Body
                                </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p className="help">Use markdown</p>
                                    <button
                                        type="button"
                                        className="button is-info is-small preview-button"
                                        onClick={this.openPreview}
                                    >
                                        Preview
                                    </button>
                                    <div className="control">
                                        <textarea
                                            id="post-body"
                                            name="body"
                                            className="textarea"
                                            rows="15"
                                            placeholder="The body of the post."
                                            onChange={this.handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <LoadingButton
                                            className="button is-primary"
                                            type="submit"
                                            isLoading={this.state.isLoading}
                                        >
                                            Submit
                                        </LoadingButton>
                                    </p>
                                    <p className="control">
                                        <Link
                                            className="button is-light"
                                            to="/"
                                        >
                                            Cancel
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
                <MarkdownModal
                    isActive={this.state.isPreviewOpen}
                    text={this.state.body}
                    onClose={this.closePreview}
                />
            </Layout>
        )
    }
}
