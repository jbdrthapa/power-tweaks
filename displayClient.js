const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;
const BaseClient = Me.imports.baseClient;

let _dbusProxy;

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

var DisplayClient = class DisplayClient extends BaseClient.BaseClient {
    constructor() {

        super();

        _dbusProxy = this.GetDBusProxy(Gio.DBus.session, powerInterface, destination, objectPath);

        _dbusProxy.connectSignal("Brightness", function () {

            this.fireEvent("BrightnessChanged", {

                Brightness: _dbusProxy.Brightness

            });

        });
    }

    StepUp() {

        var stepUpRtn = _dbusProxy.StepUpSync();

        this.fireEvent("BrightnessChanged", {

            Brightness: _dbusProxy.Brightness

        });

        return stepUpRtn;

    }

    StepDown() {

        var stepDownRtn = _dbusProxy.StepDownSync();

        this.fireEvent("BrightnessChanged", {

            Brightness: _dbusProxy.Brightness

        });

        return stepDownRtn;

    }

    get Brightness() {

        return _dbusProxy.Brightness;

    }

}