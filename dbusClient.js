const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

var DBusClient = class DBusClient {

    constructor(interfaceXml, destination, objectPath) {

        let proxyWrapper = Gio.DBusProxy.makeProxyWrapper(interfaceXml);

        this._proxy = new proxyWrapper(Gio.DBus.system, destination, objectPath);
    }

    get Proxy() {

        return this._proxy;

    }

};