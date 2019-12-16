import React from "react"

export default props => {
    if (props.messages.length === 0) {
        return ""
    }

    const className = props.isForErrors
        ? "notification is-danger"
        : "notification is-success"

    if (props.messages.length === 1) {
        return <div className={className}>{props.messages[0]}</div>
    }

    const messages = props.messages.map(message => (
        <li key={message}>{message}</li>
    ))

    return (
        <div className={className}>
            <ul>{messages}</ul>
        </div>
    )
}
