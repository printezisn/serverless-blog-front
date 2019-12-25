import React from "react"
import renderer from "react-test-renderer"

import Post from "../post"

jest.mock("../../components/layout", () => "Layout")
jest.mock("../../components/markdown", () => "Markdown")

describe("Blog post page", () => {
    it("renders correctly", () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const pageContext = { post }
        const template = renderer.create(<Post pageContext={pageContext} />)

        expect(template.toJSON()).toMatchSnapshot()
    })
})
