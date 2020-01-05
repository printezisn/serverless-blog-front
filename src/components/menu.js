import React from "react"
import { Link } from "gatsby"

import { auth } from "../api/auth"
import { Events } from "../utils/constants"
import { eventBus } from "../utils/eventBus"

export default class Menu extends React.Component {
    state = {
        isMenuOpen: false,
        isLoggedIn: auth.isLoggedIn(),
    }

    constructor(props) {
        super(props)

        this._authChanged = this._authChanged.bind(this)
        this._toggleMenu = this._toggleMenu.bind(this)
        this._logOut = this._logOut.bind(this)
    }

    componentDidMount() {
        eventBus.register(Events.AUTH_CHANGE, this._authChanged)
    }

    componentWillUnmount() {
        eventBus.unregister(Events.AUTH_CHANGE, this._authChanged)
    }

    _authChanged() {
        this.setState({ isLoggedIn: auth.isLoggedIn() })
    }

    _toggleMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    }

    _logOut() {
        auth.logOut()
    }

    render() {
        const logOutLink = this.state.isLoggedIn ? (
            <a
                href="#"
                className="navbar-item logout-button"
                onClick={this._logOut}
            >
                Logout
            </a>
        ) : (
            ""
        )

        return (
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={this._toggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div
                    className={
                        "navbar-menu " +
                        (this.state.isMenuOpen ? "is-active" : "")
                    }
                >
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">
                            Home
                        </Link>
                        <Link className="navbar-item" to="/post/read/about">
                            About
                        </Link>
                        <Link
                            className="navbar-item"
                            to="/post/read/cookie-policy"
                        >
                            Cookie Policy
                        </Link>
                        {logOutLink}
                    </div>
                </div>
            </nav>
        )
    }
}
