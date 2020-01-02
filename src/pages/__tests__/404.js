import React from "react"
import renderer from "react-test-renderer"

import NotFoundPage from "../404"

jest.mock("../../components/layout", () => "Layout")

describe("404 page", () => {
    it("renders correctly", () => {
        const notFoundPage = renderer.create(<NotFoundPage />)

        expect(notFoundPage.toJSON()).toMatchSnapshot()
    })
})
