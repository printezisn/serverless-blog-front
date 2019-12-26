import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../components/layout", () => "Layout")
jest.mock("../../components/markdown", () => "Markdown")

import Post from "../post"

describe("Blog post page", () => {
    it("renders correctly", () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            body: "test-body",
        }
        const pageContext = { post, pagePath: "/" }
        const template = renderer.create(<Post pageContext={pageContext} />)

        expect(template.toJSON()).toMatchSnapshot()
    })
})
