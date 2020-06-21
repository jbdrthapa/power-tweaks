const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;

const DBusClient = Me.imports.dbusClient;

const destination = "org.gnome.SettingsDaemon.Power";

const objectPath = "/org/gnome/SettingsDaemon/Power";

const powerInterface =
    `<node>
        <interface name="org.gnome.SettingsDaemon.Power.Screen">

            <method name = "StepUp">
                <arg type="i" name="new_percentage" direction="out"/>
                <arg type="s" name="connector" direction="out"/>
            </method>
    
            <method name="StepDown">
                <arg type="i" name="new_percentage" direction="out"/>
                <arg type="s" name="connector" direction="out"/>
            </method>
    
            <method name="Cycle">
                <arg type="i" name="new_percentage" direction="out"/>
                <arg type="i" name="output_id" direction="out"/>
            </method>
    
            <property type="i" name="Brightness" access="readwrite"/>
    
        </interface>
    
    </node>`;


var DisplayClient = class DisplayClient extends DBusClient.DBusClient {
    constructor() {
        super(Gio.DBus.session, powerInterface, destination, objectPath);
    }

    StepUp() {

        return this.Proxy.StepUpSync();

    }

    StepDown() {

        return this.Proxy.StepDownSync();

    }

    get Brightness() {

        return this.Proxy.Brightness;

    }

}

// // Connecting to a D-Bus signal
// this.Proxy.connectSignal("DeviceAdded", function (proxy) {
//     let onBattery = proxy.OnBattery;
//     Logger.logMsg("The system in on battery " + onBattery);
// })

// let loop = new GLib.MainLoop(null, false);
// loop.run();
