import React from "react"
import renderer from "react-test-renderer"

import { PostLoader, EditPost } from "../post"

jest.mock("../layout", () => "Layout")
jest.mock("../markdownModal", () => "MarkdownModal")
jest.mock("../messageBox", () => "MessageBox")
jest.mock("../loadingButton", () => "LoadingButton")

jest.mock("../../api/postAPI", () => {
    return {
        postAPI: {
            createPost: jest.fn(),
            updatePost: jest.fn(),
            getPost: jest.fn(),
        },
    }
})
jest.mock("../../api/auth", () => {
    return {
        auth: {
            isLoggedIn: jest.fn(),
        },
    }
})

import { postAPI } from "../../api/postAPI"
import { auth } from "../../api/auth"
import { Events } from "../../utils/constants"
import { eventBus } from "../../utils/eventBus"

describe("PostLoader", () => {
    it("renders correctly when the user is not logged in", () => {
        const postID = "1"

        auth.isLoggedIn.mockReturnValue(false)
        postAPI.getPost.mockReturnValue({ StatusCode: 404 })

        const postLoader = renderer.create(
            <PostLoader id={postID}></PostLoader>
        )

        expect(postAPI.getPost).toHaveBeenCalledWith(postID)
        expect(postLoader.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when it's loading", () => {
        const postID = "1"

        auth.isLoggedIn.mockReturnValueOnce(false).mockReturnValue(true)
        postAPI.getPost.mockReturnValue({ StatusCode: 404 })

        const postLoader = renderer.create(
            <PostLoader id={postID}></PostLoader>
        )

        eventBus.emit(Events.AUTH_CHANGE)

        expect(postAPI.getPost).toHaveBeenCalledWith(postID)
        expect(postLoader.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when the post is not found", () => {
        const postID = "1"

        auth.isLoggedIn.mockReturnValue(true)
        postAPI.getPost.mockReturnValue({ StatusCode: 404 })

        const postLoader = renderer.create(
            <PostLoader id={postID}></PostLoader>
        )

        return new Promise(resolve => {
            setTimeout(() => {
                expect(postAPI.getPost).toHaveBeenCalledWith(postID)
                expect(postLoader.toJSON()).toMatchSnapshot()

                resolve()
            }, 0)
        })
    })

    it("renders correctly when the post id is not provided", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const postLoader = renderer.create(<PostLoader id=""></PostLoader>)

        return new Promise(resolve => {
            setTimeout(() => {
                expect(postLoader.toJSON()).toMatchSnapshot()

                resolve()
            }, 0)
        })
    })

    it("renders correctly when an unexpected error occurred", () => {
        const postID = "1"

        auth.isLoggedIn.mockReturnValue(true)
        postAPI.getPost.mockReturnValue({ StatusCode: 500 })

        const postLoader = renderer.create(
            <PostLoader id={postID}></PostLoader>
        )

        return new Promise(resolve => {
            setTimeout(() => {
                expect(postAPI.getPost).toHaveBeenCalledWith(postID)
                expect(postLoader.toJSON()).toMatchSnapshot()

                resolve()
            }, 0)
        })
    })

    it("renders correctly when the post is loaded successfully", () => {
        const postID = "1"
        const post = { title: "Test Title" }
        const onRender = post => <p>{post.title}</p>

        auth.isLoggedIn.mockReturnValue(true)
        postAPI.getPost.mockReturnValue({ StatusCode: 200, entity: post })

        const postLoader = renderer.create(
            <PostLoader id={postID} onRender={onRender}></PostLoader>
        )

        return new Promise(resolve => {
            setTimeout(() => {
                expect(postAPI.getPost).toHaveBeenCalledWith(postID)
                expect(postLoader.toJSON()).toMatchSnapshot()

                resolve()
            }, 0)
        })
    })
})

describe("Create post", () => {
    const post = {
        id: "post id",
        title: "post title",
        description: "post description",
        tags: "post-tag",
        body: "post body",
        template: "postTemplate",
        category: "post-category",
        revision: 1,
    }

    it("renders correctly initially", () => {
        auth.isLoggedIn.mockReturnValueOnce(false).mockReturnValue(true)

        const page = renderer.create(<EditPost />)

        eventBus.emit(Events.AUTH_CHANGE)

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when the user is not logged in", () => {
        auth.isLoggedIn.mockReturnValue(false)

        const page = renderer.create(<EditPost />)

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is open", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const page = renderer.create(<EditPost />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is closed", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const page = renderer.create(<EditPost />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()
        page.root.findByType("MarkdownModal").props.onClose()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when submit has validation errors", async () => {
        await testPostCreation(<EditPost />, post, {
            StatusCode: 400,
            errors: ["err"],
        })
    })

    it("renders correctly when submit has unexpected failure", async () => {
        await testPostCreation(<EditPost />, post, {
            StatusCode: 400,
            errors: [],
        })
    })

    it("renders correctly when submit is successful", async () => {
        await testPostCreation(<EditPost />, post, {
            StatusCode: 200,
            errors: [],
        })
    })
})

describe("Edit post", () => {
    const initialPost = {
        id: "post id",
        title: "post title",
        description: "post description",
        tags: "post-tag",
        body: "post body",
        template: "postTemplate",
        category: "post-category",
        revision: 2,
    }
    const updatedPost = {
        id: "post id",
        title: "post title 2",
        description: "post description 2",
        tags: "post-tag2",
        body: "post body 2",
        template: "postTemplate2",
        category: "post-category2",
        revision: 2,
    }

    it("renders correctly initially", () => {
        auth.isLoggedIn.mockReturnValueOnce(false).mockReturnValue(true)

        const page = renderer.create(<EditPost post={initialPost} />)

        eventBus.emit(Events.AUTH_CHANGE)

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when the user is not logged in", () => {
        auth.isLoggedIn.mockReturnValueOnce(false)

        const page = renderer.create(<EditPost post={initialPost} />)

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is open", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const page = renderer.create(<EditPost post={initialPost} />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is closed", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const page = renderer.create(<EditPost post={initialPost} />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()
        page.root.findByType("MarkdownModal").props.onClose()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when submit has validation errors", async () => {
        await testPostUpdate(<EditPost post={initialPost} />, updatedPost, {
            StatusCode: 400,
            errors: ["err"],
        })
    })

    it("renders correctly when submit has unexpected failure", async () => {
        await testPostUpdate(<EditPost post={initialPost} />, updatedPost, {
            StatusCode: 400,
            errors: [],
        })
    })

    it("renders correctly when submit is successful", async () => {
        await testPostUpdate(<EditPost post={initialPost} />, updatedPost, {
            StatusCode: 200,
            errors: [],
        })
    })
})

async function testPostCreation(element, post, expectedResult) {
    auth.isLoggedIn.mockReturnValue(true)

    const page = renderer.create(element)

    for (let key in post) {
        if (key !== "revision") {
            page.root.findByProps({ name: key }).props.onChange({
                target: { name: key, value: post[key] },
            })
        }
    }

    postAPI.createPost.mockReturnValue(expectedResult)

    await page.root
        .findByType("form")
        .props.onSubmit({ preventDefault: () => {} })

    expect(postAPI.createPost).toHaveBeenCalledWith(post)
    expect(page.toJSON()).toMatchSnapshot()
}

async function testPostUpdate(element, post, expectedResult) {
    auth.isLoggedIn.mockReturnValue(true)

    const page = renderer.create(element)

    for (let key in post) {
        if (key !== "revision" && key !== "id") {
            page.root.findByProps({ name: key }).props.onChange({
                target: { name: key, value: post[key] },
            })
        }
    }

    postAPI.updatePost.mockReturnValue(expectedResult)

    await page.root
        .findByType("form")
        .props.onSubmit({ preventDefault: () => {} })

    expect(postAPI.updatePost).toHaveBeenCalledWith(post)
    expect(page.toJSON()).toMatchSnapshot()
}
