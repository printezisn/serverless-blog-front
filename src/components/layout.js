import React from "react"
import Header from "./header"

export default ({ compact, children }) => (
    <div>
        <Header />
        <main className={"container is-fluid" + (compact ? " is-compact" : "")}>
            {children}
        </main>
    </div>
)
