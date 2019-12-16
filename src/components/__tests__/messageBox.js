import React from "react"
import renderer from "react-test-renderer"

import MessageBox from "../messageBox"

describe("MessageBox", () => {
    it("renders correctly when it's for errors and doesn't have any messages", () => {
        const box = renderer
            .create(<MessageBox isForErrors={true} messages={[]} />)
            .toJSON()
        expect(box).toMatchSnapshot()
    })

    it("renders correctly when it's for errors and has 1 message", () => {
        const box = renderer
            .create(<MessageBox isForErrors={true} messages={["msg1"]} />)
            .toJSON()
        expect(box).toMatchSnapshot()
    })

    it("renders correctly when it's for errors and has more than 1 messages", () => {
        const box = renderer
            .create(
                <MessageBox isForErrors={true} messages={["msg1", "msg2"]} />
            )
            .toJSON()
        expect(box).toMatchSnapshot()
    })

    it("renders correctly when it's not for errors and doesn't have any messages", () => {
        const box = renderer
            .create(<MessageBox isForErrors={false} messages={[]} />)
            .toJSON()
        expect(box).toMatchSnapshot()
    })

    it("renders correctly when it's not for errors and has 1 message", () => {
        const box = renderer
            .create(<MessageBox isForErrors={false} messages={["msg1"]} />)
            .toJSON()
        expect(box).toMatchSnapshot()
    })

    it("renders correctly when it's not for errors and has more than 1 messages", () => {
        const box = renderer
            .create(
                <MessageBox isForErrors={false} messages={["msg1", "msg2"]} />
            )
            .toJSON()
        expect(box).toMatchSnapshot()
    })
})
