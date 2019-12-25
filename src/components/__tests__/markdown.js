import React from "react"
import renderer from "react-test-renderer"

import Markdown from "../markdown"

describe("Markdown", () => {
    it("renders correctly", () => {
        const text =
            "### Header\n\n" +
            "* List\n" +
            " * Top 1\n" +
            " * Top 2\n" +
            " * Top 3\n"

        const markdown = renderer
            .create(<Markdown text={text}></Markdown>)
            .toJSON()

        expect(markdown).toMatchSnapshot()
    })
})
