import React from "react"
import renderer from "react-test-renderer"

import PostPage from "../postPage"

jest.mock("../../components/layout", () => "Layout")

describe("Blog post page", () => {
    it("renders correctly", () => {
        const siteUrl = "site_url"
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
        const pageContext = { prevPagePath, nextPagePath, page, siteUrl }
        const postPage = renderer.create(<PostPage pageContext={pageContext} />)

        expect(postPage.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when next page is not provided", () => {
        const siteUrl = "site_url"
        const prevPagePath = "/prevPage"
        const nextPagePath = ""
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
        const pageContext = { prevPagePath, nextPagePath, page, siteUrl }
        const postPage = renderer.create(<PostPage pageContext={pageContext} />)

        expect(postPage.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when previous page is not provided", () => {
        const siteUrl = "site_url"
        const prevPagePath = ""
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
        const pageContext = { prevPagePath, nextPagePath, page, siteUrl }
        const postPage = renderer.create(<PostPage pageContext={pageContext} />)

        expect(postPage.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when no next or previous page is provided", () => {
        const siteUrl = "site_url"
        const prevPagePath = ""
        const nextPagePath = ""
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
        const pageContext = { prevPagePath, nextPagePath, page, siteUrl }
        const postPage = renderer.create(<PostPage pageContext={pageContext} />)

        expect(postPage.toJSON()).toMatchSnapshot()
    })
})
