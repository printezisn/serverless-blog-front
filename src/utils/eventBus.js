class EventBus {
    constructor() {
        this.events = {}
    }

    register(eventName, listener) {
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(listener)
    }

    unregister(eventName, listener) {
        const listeners = this.events[eventName] || []
        const index = listeners.indexOf(listener)
        if (index >= 0) {
            listeners.splice(index, 1)
        }
    }

    emit(eventName, data) {
        const listeners = this.events[eventName] || []
        listeners.forEach(listener => listener(data))
    }
}

export const eventBus = new EventBus()
