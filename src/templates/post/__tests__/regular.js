import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../../components/layout", () => "Layout")
jest.mock("../../../components/markdown", () => "Markdown")

import RegularPost from "../regular"

describe("Regular post page", () => {
    it("renders correctly", () => {
        const post = {
            id: "test-id",
            title: "test-title",
            description: "test-description",
            tags: "test-tag1,test-tag2",
            body: "test-body",
        }
        const pageContext = { post, pagePath: "/" }
        const template = renderer.create(
            <RegularPost pageContext={pageContext} />
        )

        expect(template.toJSON()).toMatchSnapshot()
    })
})
