import React from "react"
import { Link } from "gatsby"

export default class Menu extends React.Component {
    state = {
        isMenuOpen: false,
    }

    constructor(props) {
        super(props)

        this._toggleMenu = this._toggleMenu.bind(this)
    }

    _toggleMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    }

    render() {
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
                        <Link className="navbar-item" to="/about">
                            About
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}
