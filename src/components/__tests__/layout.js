import React from "react"
import renderer from "react-test-renderer"

import Layout from "../layout"

jest.mock("../header", () => "Header")

describe("Layout", () => {
    it("renders correctly", () => {
        const layout = renderer
            .create(
                <Layout>
                    <span>Child</span>
                </Layout>
            )
            .toJSON()
        expect(layout).toMatchSnapshot()
    })

    it("renders correctly when it's compact", () => {
        const layout = renderer
            .create(
                <Layout compact={true}>
                    <span>Child</span>
                </Layout>
            )
            .toJSON()
        expect(layout).toMatchSnapshot()
    })
})
