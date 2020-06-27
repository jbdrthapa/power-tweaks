
let eventMap = new WeakMap();

var EventTarget = class EventTarget {

    constructor() {

        eventMap.set(this, {

            listeners: {}

        });

    }

    addListener(eventType, handler) {

        let listeners = eventMap.get(this).listeners;

        if (!listeners[eventType]) {

            listeners[eventType] = [];

        }

        listeners[eventType].push(handler);

    }

    fireEvent(eventType, eventObject) {

        if (!eventType) {

            throw new Error("Unknown event type.")

        }

        // If event object is not passed create one
        if (!eventObject) {

            eventObject = {};

        }

        if (!eventObject.eventType) {

            eventObject.eventType = eventType;

        }

        if (!eventObject.target) {

            eventObject.target = this;

        }

        let listeners = eventMap.get(this).listeners[eventType];

        if (!listeners) {

            return;

        }

        listeners.forEach(function (item) {

            item(eventObject);

        });

    }

    removeListener(eventType, handler) {

        let listeners = eventMap.get(this).listeners[eventType];

        if (!listeners) {

            return;

        }

        let index = listeners.indexOf(handler);

        while (index > -1) {

            listeners.splice(index, 1);

            index = listeners.indexOf(handler);

        }

    }

}