import React from "react"
import renderer from "react-test-renderer"

import PostPage from "../postPage"

jest.mock("../../components/layout", () => "Layout")

describe("Blog post page", () => {
    it("renders correctly", () => {
        const prevPagePath = "/prevPage"
        const nextPagePath = "/nextPage"
        const page = [
            {
                id: "test-id1",
                title: "test-title1",
                description: "test-description1",
            },
            {
                id: "test-id2",
                title: "test-title2",
                description: "test-description2",
            },
            {
                id: "test-id3",
                title: "test-title3",
                description: "test-description3",
            },
        ]
        const pageContext = { prevPagePath, nextPagePath, page }
        const postPage = renderer.create(<PostPage pageContext={pageContext} />)

        expect(postPage.toJSON()).toMatchSnapshot()
    })
})
