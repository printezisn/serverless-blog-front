import React from "react"
import renderer from "react-test-renderer"

import EditPage from "../edit"

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
        EditPost: "EditPost",
    }
})

describe("Edit page", () => {
    it("renders correctly", () => {
        const editPage = renderer.create(<EditPage />)

        expect(editPage.toJSON()).toMatchSnapshot()
    })

    it("renders the edit post form correctly", () => {
        const post = { title: "Test Title" }
        const editPage = renderer.create(<EditPage />)
        const form = editPage.root.findByType("PostLoader").props.onRender(post)

        expect(form).toMatchSnapshot()
    })
})
