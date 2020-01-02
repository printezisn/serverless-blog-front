import React from "react"
import renderer from "react-test-renderer"

jest.mock("../../api/auth", () => {
    return {
        auth: {
            logIn: jest.fn(),
        },
    }
})

import Login from "../login"
import { auth } from "../../api/auth"

describe("Login page", () => {
    it("renders correctly", () => {
        const loginPage = renderer.create(<Login />)

        expect(loginPage.toJSON()).toMatchSnapshot()
        expect(auth.logIn).toHaveBeenCalled()
    })
})
