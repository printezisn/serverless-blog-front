import React from "react"
import renderer from "react-test-renderer"

import Menu from "../menu"

describe("Menu", () => {
    it("renders correctly when it's not active", () => {
        const menu = renderer.create(<Menu />).toJSON()
        expect(menu).toMatchSnapshot()
    })

    it("renders correctly when it's active", () => {
        const menu = renderer.create(<Menu />)
        menu.root
            .findByProps({ className: "navbar-burger burger" })
            .props.onClick()
        expect(menu.toJSON()).toMatchSnapshot()
    })
})
