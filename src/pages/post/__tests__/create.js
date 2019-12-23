import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../../components/layout", () => "Layout")
jest.mock("../../../components/post", () => {
    return {
        EditPost: "EditPost",
    }
})

import Create from "../create"

describe("Create page", () => {
    it("renders correctly", () => {
        const page = renderer.create(<Create />)

        expect(page.toJSON()).toMatchSnapshot()
    })
})
