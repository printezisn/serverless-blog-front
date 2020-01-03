import React from "react"
import renderer from "react-test-renderer"

import Header from "../header"

jest.mock("../menu", () => "Menu")

describe("Header", () => {
    const oldEnvVariables = process.env

    afterEach(() => {
        process.env.GATSBY_EDNABLOG_SITE_TITLE =
            oldEnvVariables.GATSBY_EDNABLOG_SITE_TITLE
        process.env.GATSBY_EDNABLOG_SITE_SUBTITLE =
            oldEnvVariables.GATSBY_EDNABLOG_SITE_SUBTITLE
    })

    it("renders correctly", () => {
        process.env.GATSBY_EDNABLOG_SITE_TITLE = "Edna Blog"
        process.env.GATSBY_EDNABLOG_SITE_SUBTITLE =
            "(E)very (D)eveloper (N)eeds (A) blog"

        const header = renderer.create(<Header />).toJSON()
        expect(header).toMatchSnapshot()
    })
})
