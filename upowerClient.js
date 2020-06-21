const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;


const DBusClient = Me.imports.dbusClient;

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

var UPowerClient = class UPowerClient extends DBusClient.DBusClient {
    constructor() {
        super(Gio.DBus.system, upowerInterface, destination, objectPath);
    }

    get OnBattery() {

        return this.Proxy.OnBattery;

    }

    get LidIsPresent() {

        return this.Proxy.LidIsPresent;

    }

}

// // Connecting to a D-Bus signal
// this.Proxy.connectSignal("DeviceAdded", function (proxy) {
//     let onBattery = proxy.OnBattery;
//     Logger.logMsg("The system in on battery " + onBattery);
// })

// let loop = new GLib.MainLoop(null, false);
// loop.run();
