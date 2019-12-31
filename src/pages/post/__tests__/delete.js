import React from "react"
import renderer from "react-test-renderer"

jest.mock("@reach/router", () => {
    const location = {
        search: "?id=test-id",
    }

    return {
        Location: props => <p>{props.children({ location })}</p>,
    }
})
jest.mock("../../../components/layout", () => "Layout")
jest.mock("../../../components/post", () => {
    return {
        PostLoader: "PostLoader",
    }
})
jest.mock("../../../components/markdown", () => "Markdown")
jest.mock("../../../components/messageBox", () => "MessageBox")
jest.mock("../../../components/loadingButton", () => "LoadingButton")
jest.mock("../../../api/postAPI", () => {
    return {
        postAPI: {
            deletePost: jest.fn(),
        },
    }
})

import { postAPI } from "../../../api/postAPI"
import DeletePage from "../delete"

describe("Delete page", () => {
    it("renders correctly", () => {
        const deletePage = renderer.create(<DeletePage />)

        expect(deletePage.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when the post is loaded", async () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const deletePage = renderer.create(<DeletePage />)
        const postComponent = await deletePage.root
            .findByType("PostLoader")
            .props.onRender(post)

        expect(postComponent).toMatchSnapshot()
    })

    it("renders correctly when the post is not found", async () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const deletePage = renderer.create(<DeletePage />)
        let postComponent = renderer.create(
            await deletePage.root.findByType("PostLoader").props.onRender(post)
        )

        postAPI.deletePost.mockReturnValue({ StatusCode: 404 })

        await postComponent.root.findByType("LoadingButton").props.onClick()

        postComponent = await deletePage.root
            .findByType("PostLoader")
            .props.onRender(post)

        expect(postAPI.deletePost).toHaveBeenCalledWith(post.id)
        expect(postComponent).toMatchSnapshot()
    })

    it("renders correctly when an unexpected error occurs", async () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const deletePage = renderer.create(<DeletePage />)
        let postComponent = renderer.create(
            await deletePage.root.findByType("PostLoader").props.onRender(post)
        )

        postAPI.deletePost.mockReturnValue({ StatusCode: 400 })

        await postComponent.root.findByType("LoadingButton").props.onClick()

        postComponent = await deletePage.root
            .findByType("PostLoader")
            .props.onRender(post)

        expect(postAPI.deletePost).toHaveBeenCalledWith(post.id)
        expect(postComponent).toMatchSnapshot()
    })

    it("renders correctly when the post is deleted successfully", async () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const deletePage = renderer.create(<DeletePage />)
        let postComponent = renderer.create(
            await deletePage.root.findByType("PostLoader").props.onRender(post)
        )

        postAPI.deletePost.mockReturnValue({ StatusCode: 200 })

        await postComponent.root.findByType("LoadingButton").props.onClick()

        postComponent = await deletePage.root
            .findByType("PostLoader")
            .props.onRender(post)

        expect(postAPI.deletePost).toHaveBeenCalledWith(post.id)
        expect(postComponent).toMatchSnapshot()
    })
})
