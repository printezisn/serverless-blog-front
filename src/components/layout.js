import React from "react"
import Header from "./header"

export default ({ children }) => (
    <div>
        <Header />
        <main>{children}</main>
    </div>
)
