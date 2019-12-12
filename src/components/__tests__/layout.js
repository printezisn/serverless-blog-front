import React from "react"
import renderer from "react-test-renderer"

import Layout from "../layout"

jest.mock("../header", () => "Header")

describe("Layout", () => {
    it("renders correctly", () => {
        const menu = renderer
            .create(
                <Layout>
                    <span>Child</span>
                </Layout>
            )
            .toJSON()
        expect(menu).toMatchSnapshot()
    })
})
