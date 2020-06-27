const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.lib.logger;
const EventTarget = Me.imports.lib.eventTarget;

let eventMap = new WeakMap();

var BaseClient = class BaseClient extends EventTarget.EventTarget {

    constructor() {

        super();

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


    GetDBusProxy(proxyType, interfaceXml, destination, objectPath) {

        let proxyWrapper = Gio.DBusProxy.makeProxyWrapper(interfaceXml);

        return new proxyWrapper(proxyType, destination, objectPath);

    }
}