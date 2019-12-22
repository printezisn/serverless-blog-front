import React from "react"
import marked from "marked"

export default class MarkdownModal extends React.Component {
    render() {
        const className = this.props.isActive ? "modal is-active" : "modal"
        const text = marked(this.props.text)

        return (
            <div className={className}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Preview</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={this.props.onClose}
                        ></button>
                    </header>
                    <section
                        className="modal-card-body"
                        dangerouslySetInnerHTML={{ __html: text }}
                    ></section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={this.props.onClose}>
                            Close
                        </button>
                    </footer>
                </div>
            </div>
        )
    }
}
