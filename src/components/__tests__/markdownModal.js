import React from "react"
import renderer from "react-test-renderer"

import MarkdownModal from "../markdownModal"

jest.mock("../markdown", () => "Markdown")

describe("MarkdownModal", () => {
    it("renders correctly when it's not active", () => {
        const modal = renderer
            .create(
                <MarkdownModal
                    isActive="false"
                    text="Test inactive text."
                    onClose={() => {}}
                />
            )
            .toJSON()
        expect(modal).toMatchSnapshot()
    })

    it("renders correctly when it's active", () => {
        const modal = renderer
            .create(
                <MarkdownModal
                    isActive="true"
                    text="Test active text."
                    onClose={() => {}}
                />
            )
            .toJSON()
        expect(modal).toMatchSnapshot()
    })

    it("closes when the close button is clicked", () => {
        let totalInvokes = 0

        const modal = renderer.create(
            <MarkdownModal
                isActive="true"
                text="Test active text."
                onClose={() => totalInvokes++}
            />
        )

        modal.root.findByProps({ className: "delete" }).props.onClick()
        modal.root
            .findByProps({ className: "modal-card-foot" })
            .findByProps({ className: "button" })
            .props.onClick()

        expect(totalInvokes).toBe(2)
    })
})
