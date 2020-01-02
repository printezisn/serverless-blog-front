import { eventBus } from "../eventBus"

describe("EventBus", () => {
    it("registers a listener correctly", () => {
        let counter = 0
        const listener = () => counter++

        eventBus.register("event", listener)
        eventBus.emit("event")

        expect(counter).toBe(1)
    })

    it("unregisters a listener correctly", () => {
        let counter = 0
        const listener = () => counter++

        eventBus.register("event1", listener)
        eventBus.unregister("event1", listener)
        eventBus.emit("event1")

        expect(counter).toBe(0)
    })

    it("behaves correctly when an unknown listener is asked to be unregistered", () => {
        let counter = 0
        const listener = () => counter++

        eventBus.unregister("event2", listener)
        eventBus.emit("event2")

        expect(counter).toBe(0)
    })
})
