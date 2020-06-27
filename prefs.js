'use strict';

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.lib.logger;

function init() {
    Logger.logMsg(`Initializing ${Me.metadata.name} Preferences`);
}

function createToggle(widget, title, setting, left, top) {

    //public void attach (Widget child, int left, int top, int width = 1, int height = 1)

    let label = new Gtk.Label({
        label: title,
        halign: Gtk.Align.END,
        visible: true
    });
    widget.attach(label, left, top, 1, 1);


    let toggle = new Gtk.Switch({
        active: this.settings.get_boolean(setting),
        halign: Gtk.Align.END,
        visible: true
    });
    widget.attach(toggle, (left + 1), top, 1, 1);

    this.settings.bind(setting, toggle, 'active', Gio.SettingsBindFlags.DEFAULT);
}

function buildPrefsWidget() {

    Logger.logMsg(`Building preferences widgets`);

    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );

    this.settings = new Gio.Settings({
        settings_schema: gschema.lookup('org.gnome.shell.extensions.powertweaks', true)
    });

    // Create a parent widget that we'll return from this function
    let prefsWidget = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true
    });

    // Add a simple title and add it to the prefsWidget
    let title = new Gtk.Label({
        label: `<b>${Me.metadata.name} preferences</b>`,
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, 0, 2, 1);

    createToggle(prefsWidget, "Enable Logging", "enable-logging", 1, 1);

    createToggle(prefsWidget, "React on PM Events", "react-on-pm-events", 1, 2);

    Logger.logMsg(`Building preferences widgets done`);

    return prefsWidget;
}