import React from "react"
import { Link } from "gatsby"

import MarkdownModal from "./markdownModal"
import MessageBox from "./messageBox"
import LoadingButton from "./loadingButton"

import { postAPI } from "../api/postAPI"

export class PostLoader extends React.Component {
    state = {
        isLoading: true,
        hasErrors: false,
        isNotFound: false,
        post: {},
    }

    async componentDidMount() {
        const state = {
            isLoading: false,
            hasErrors: false,
            isNotFound: false,
            post: {},
        }

        if (!this.props.id) {
            state.isNotFound = true
        } else {
            const response = await postAPI.getPost(this.props.id)
            if (response.StatusCode === 404) {
                state.isNotFound = true
            } else if (response.StatusCode !== 200) {
                state.hasErrors = true
            } else {
                state.post = response.entity
            }
        }

        this.setState(state)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <p className="has-text-centered">
                    <i className="fas fa-circle-notch fa-spin fa-9x"></i>
                </p>
            )
        }
        if (this.state.hasErrors) {
            return (
                <p className="has-text-centered">
                    An error occurred. Please try again later.
                </p>
            )
        }
        if (this.state.isNotFound) {
            return (
                <p className="has-text-centered">
                    The blog post you requested was not found.
                </p>
            )
        }

        return this.props.onRender(this.state.post)
    }
}

export class EditPost extends React.Component {
    constructor(props) {
        super(props)

        const post = this.props.post || {}
        this.state = {
            id: post.id || "",
            title: post.title || "",
            description: post.description || "",
            body: post.body || "",
            errors: [],
            successMessages: [],
            isPreviewOpen: false,
            isLoading: false,
        }

        this.submit = this.submit.bind(this)
        this.openPreview = this.openPreview.bind(this)
        this.closePreview = this.closePreview.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async submit(e) {
        e.preventDefault()

        const isForEdit = this.props.post
        const post = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
            revision: isForEdit ? this.props.post.revision : 1,
        }

        this.setState({ isLoading: true })
        const response = isForEdit
            ? await postAPI.updatePost(post)
            : await postAPI.createPost(post)
        this.setState({ isLoading: false })

        if (response.errors.length > 0) {
            this.setState({ errors: response.errors, successMessages: [] })
        } else if (response.StatusCode !== 200) {
            this.setState({
                errors: ["An unexpected error occurred"],
                successMessages: [],
            })
        } else {
            const message = isForEdit
                ? "The post was updated successfully!"
                : "The post was created successfully!"
            this.setState({
                errors: [],
                successMessages: [message],
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
        const idInput = this.props.post ? (
            <input
                id="post-id"
                name="id"
                className="input"
                type="text"
                placeholder="The ID of the post."
                value={this.state.id}
                disabled
            />
        ) : (
            <input
                id="post-id"
                name="id"
                className="input"
                type="text"
                placeholder="The ID of the post."
                value={this.state.id}
                onChange={this.handleInputChange}
            />
        )

        return (
            <div>
                <MessageBox
                    isForErrors={false}
                    messages={this.state.successMessages}
                />
                <MessageBox isForErrors={true} messages={this.state.errors} />
                <form className="small-form" onSubmit={this.submit}>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal required-label">
                            <label className="label" htmlFor="post-id">
                                ID
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">{idInput}</div>
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
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal required-label">
                            <label className="label" htmlFor="post-description">
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
                                        value={this.state.description}
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
                                    className="button is-link preview-button"
                                    onClick={this.openPreview}
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                    &nbsp; Preview
                                </button>
                                <div className="control">
                                    <textarea
                                        id="post-body"
                                        name="body"
                                        className="textarea"
                                        rows="15"
                                        placeholder="The body of the post."
                                        value={this.state.body}
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
                                        className="button is-link"
                                        type="submit"
                                        isLoading={this.state.isLoading}
                                    >
                                        <i className="fas fa-save"></i>
                                        &nbsp; Submit
                                    </LoadingButton>
                                </p>
                                <p className="control">
                                    <Link className="button is-light" to="/">
                                        <i className="fas fa-arrow-left"></i>
                                        &nbsp; Cancel
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
                <MarkdownModal
                    isActive={this.state.isPreviewOpen}
                    text={this.state.body}
                    onClose={this.closePreview}
                />
            </div>
        )
    }
}
