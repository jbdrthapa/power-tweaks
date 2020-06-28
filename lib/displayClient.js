const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.lib.logger;
const BaseClient = Me.imports.lib.baseClient;

let _dbusProxy;

const _eventsEnum = {

    BrightnessChanged: "BrightnessChanged"
}

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

    }

    StepUp() {

        var stepUpRtn;

        try {

            stepUpRtn = _dbusProxy.StepUpSync();

            this.fireEvent(_eventsEnum.BrightnessChanged, {

                Brightness: _dbusProxy.Brightness

            });
        }
        catch{

        }

        return stepUpRtn;

    }

    StepDown() {

        var stepDownRtn;

        try {

            stepDownRtn = _dbusProxy.StepDownSync();

            this.fireEvent(_eventsEnum.BrightnessChanged, {

                Brightness: _dbusProxy.Brightness

            });
        }
        catch{

        }

        return stepDownRtn;

    }

    get Brightness() {

        var brightness;

        try {

            brightness = _dbusProxy.Brightness;
        }
        catch{

        }

        return brightness;

    }

    get Events() {

        return _eventsEnum;

    }

}