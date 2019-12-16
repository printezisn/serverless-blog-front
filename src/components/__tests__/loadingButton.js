import React from "react"
import renderer from "react-test-renderer"

import LoadingButton from "../loadingButton"

describe("LoadingButton", () => {
    it("renders correctly when it's not loading", () => {
        const button = renderer
            .create(
                <LoadingButton
                    type="submit"
                    className="button"
                    isLoading={false}
                >
                    Test Text
                </LoadingButton>
            )
            .toJSON()
        expect(button).toMatchSnapshot()
    })

    it("renders correctly when it's loading", () => {
        const button = renderer
            .create(
                <LoadingButton
                    type="submit"
                    className="button"
                    isLoading={true}
                >
                    Test Text
                </LoadingButton>
            )
            .toJSON()
        expect(button).toMatchSnapshot()
    })
})
