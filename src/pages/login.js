import React from "react"
import { auth } from "../api/auth"

export default class Login extends React.Component {
    componentDidMount() {
        auth.logIn()
    }

    render() {
        return ""
    }
}
