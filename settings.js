const Gio = imports.gi.Gio;
const Me = imports.misc.extensionUtils.getCurrentExtension();;

let _gschema = Gio.SettingsSchemaSource.new_from_directory(
    Me.dir.get_child('schemas').get_path(),
    Gio.SettingsSchemaSource.get_default(),
    false
);

let _settings = new Gio.Settings({

    settings_schema: _gschema.lookup('org.gnome.shell.extensions.powertweaks', true)

});

var application = {
    loggingEnabled: function () {
        return getSetting('enable-logging');
    }
}

function getSetting(setting) {

    return _settings.get_value(setting).deep_unpack();

}

