import React from "react"
import Markdown from "./markdown"

export default class MarkdownModal extends React.Component {
    render() {
        const className = this.props.isActive ? "modal is-active" : "modal"

        return (
            <div className={className}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="modal-card-head">
                        <p className="modal-card-title">Preview</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={this.props.onClose}
                        ></button>
                    </div>
                    <div className="modal-card-body">
                        <Markdown text={this.props.text}></Markdown>
                    </div>
                    <div className="modal-card-foot">
                        <button className="button" onClick={this.props.onClose}>
                            <i className="fas fa-arrow-left"></i>
                            &nbsp; Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
