import React from "react"
import { Link } from "gatsby"

import Menu from "./menu"

export default () => (
    <header>
        <Menu />
        <div className="banner">
            <h1 className="title is-1 has-text-centered">
                <Link to="/">
                    <i className="fas fa-laptop-code"></i>
                    {process.env.GATSBY_EDNABLOG_SITE_TITLE}
                </Link>
            </h1>
            <p className="subtitle has-text-centered">
                {process.env.GATSBY_EDNABLOG_SITE_SUBTITLE}
            </p>
        </div>
    </header>
)
