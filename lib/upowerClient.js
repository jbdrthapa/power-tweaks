const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.lib.logger;
const BaseClient = Me.imports.lib.baseClient;

let _dbusProxy;

const destination = "org.freedesktop.UPower";

const objectPath = "/org/freedesktop/UPower";

const upowerInterface =
    `<node>

        <interface name="org.freedesktop.UPower">

            <property name="OnBattery" type="b" access="read"/>

            <property name="LidIsPresent" type="b" access="read"/>

            <signal name="DeviceAdded">

                <arg type="o"/>

            </signal>

        </interface> 
        
    </node>`;

var UPowerClient = class UPowerClient extends BaseClient.BaseClient {
    constructor() {

        super();

        _dbusProxy = this.GetDBusProxy(Gio.DBus.system, upowerInterface, destination, objectPath);

    }

    get OnBattery() {

        return _dbusProxy.OnBattery;

    }

    get LidIsPresent() {

        return _dbusProxy.LidIsPresent;

    }

}