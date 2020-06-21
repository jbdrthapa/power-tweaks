const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

var DBusClient = class DBusClient {

    constructor(proxyType, interfaceXml, destination, objectPath) {

        let proxyWrapper = Gio.DBusProxy.makeProxyWrapper(interfaceXml);

        this._proxy = new proxyWrapper(proxyType, destination, objectPath);
    }

    get Proxy() {

        return this._proxy;

    }

};