import React from "react"
import marked from "marked"

export default class Markdown extends React.Component {
    static renderer = Markdown.createRenderer()

    static createRenderer() {
        const renderer = new marked.Renderer()
        renderer.heading = function(text, level) {
            return `<h${level} class="title is-${level}">${text}</h${level}>`
        }

        return renderer
    }

    render() {
        const text = marked(this.props.text, {
            renderer: Markdown.renderer,
        })

        return (
            <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: text }}
            ></div>
        )
    }
}
