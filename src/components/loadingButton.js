import React from "react"

export default props => {
    if (props.isLoading) {
        return (
            <button
                type={props.type}
                className={props.className + " is-loading"}
                disabled
            >
                {props.children}
            </button>
        )
    }

    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
