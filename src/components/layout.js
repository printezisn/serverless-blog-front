import React from "react"
import Header from "./header"

export default ({ children }) => (
    <div>
        <Header />
        <main className="container">{children}</main>
    </div>
)
