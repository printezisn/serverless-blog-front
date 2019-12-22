import React from "react"
import { Router } from "@reach/router"

import Layout from "../../components/layout"

export default () => (
    <Layout>
        <Router>
            <InternalEdit path="/post/edit/:id"></InternalEdit>
        </Router>
    </Layout>
)

class InternalEdit extends React.Component {
    render() {
        return <div>{this.props.id}</div>
    }
}
