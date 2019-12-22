import React from "react"
import renderer from "react-test-renderer"

import Markdown from "../markdown"

describe("Markdown", () => {
    it("renders correctly", () => {
        const text = `
            ### Header

            * List
              * Top 1
              * Top 2
              * Top 3
        `
        const markdown = renderer
            .create(<Markdown text={text}></Markdown>)
            .toJSON()

        expect(markdown).toMatchSnapshot()
    })
})
