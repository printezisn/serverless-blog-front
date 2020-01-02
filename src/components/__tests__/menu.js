import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../api/auth", () => {
    return {
        auth: {
            isLoggedIn: jest.fn(),
            logOut: jest.fn(),
        },
    }
})

import { auth } from "../../api/auth"
import Menu from "../menu"
import { Events } from "../../utils/constants"
import { eventBus } from "../../utils/eventBus"

describe("Menu", () => {
    it("renders correctly when it's not active", () => {
        auth.isLoggedIn.mockReturnValue(false)

        const menu = renderer.create(<Menu />).toJSON()
        expect(menu).toMatchSnapshot()
    })

    it("renders correctly when it's active", () => {
        auth.isLoggedIn.mockReturnValue(false)

        const menu = renderer.create(<Menu />)
        menu.root
            .findByProps({ className: "navbar-burger burger" })
            .props.onClick()
        expect(menu.toJSON()).toMatchSnapshot()
    })

    it("renders correctly when the user is logged in", () => {
        auth.isLoggedIn.mockReturnValueOnce(false).mockReturnValue(true)

        const menu = renderer.create(<Menu />)
        menu.root
            .findByProps({ className: "navbar-burger burger" })
            .props.onClick()
        expect(menu.toJSON()).toMatchSnapshot()

        eventBus.emit(Events.AUTH_CHANGE)

        expect(menu.toJSON()).toMatchSnapshot()
    })

    it("logs the user out when the logout link is clicked", () => {
        auth.isLoggedIn.mockReturnValue(true)

        const menu = renderer.create(<Menu />)
        menu.root
            .findByProps({ className: "navbar-item logout-button" })
            .props.onClick()

        expect(auth.logOut).toHaveBeenCalled()
    })
})
