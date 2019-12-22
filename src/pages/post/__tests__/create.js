import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../../components/layout", () => "Layout")
jest.mock("../../../components/markdownModal", () => "MarkdownModal")
jest.mock("../../../components/messageBox", () => "MessageBox")
jest.mock("../../../components/LoadingButton", () => "LoadingButton")

jest.mock("../../../api/postAPI", () => {
    return {
        postAPI: {
            createPost: jest.fn(),
        },
    }
})

import { postAPI } from "../../../api/postAPI"

import Create from "../create"

describe("Create page", () => {
    it("renders correctly initially", () => {
        const page = renderer.create(<Create />)

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is open", () => {
        const page = renderer.create(<Create />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when preview is closed", () => {
        const page = renderer.create(<Create />)
        page.root
            .findByProps({
                className: "button is-link preview-button",
            })
            .props.onClick()
        page.root.findByType("MarkdownModal").props.onClose()

        expect(page.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when submit has validation errors", async () => {
        await testFormSubmit({ StatusCode: 400, errors: ["err"] })
    })

    it("renders correctly when submit has unexpected failure", async () => {
        await testFormSubmit({ StatusCode: 400, errors: [] })
    })

    it("renders correctly when submit is successful", async () => {
        await testFormSubmit({ StatusCode: 200, errors: [] })
    })
})

async function testFormSubmit(expectedResult) {
    const page = renderer.create(<Create />)
    const post = {
        id: "post id",
        title: "post title",
        description: "post description",
        body: "post body",
        revision: 1,
    }

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
