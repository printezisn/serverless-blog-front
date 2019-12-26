import React from "react"
import Menu from "./menu"

export default () => (
    <header>
        <Menu />
        <div className="banner">
            <h1 className="title is-1 has-text-centered">
                <i className="fas fa-laptop-code"></i>
                EDNA Blog
            </h1>
            <p className="subtitle has-text-centered">
                (E)very (D)eveloper (N)eeds (A) blog
            </p>
        </div>
    </header>
)
