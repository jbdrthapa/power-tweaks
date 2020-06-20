'use strict';

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;

function init() {
    Logger.logMsg(`Initializing ${Me.metadata.name} Preferences`);
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
        label: '<b>' + Me.metadata.name + ' Extension Preferences</b>',
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, 0, 2, 1);

    // Enable logging

    let enableLoggingToggle = new Gtk.Switch({
        active: this.settings.get_boolean('enable-logging'),
        halign: Gtk.Align.END,
        visible: true
    });

    prefsWidget.attach(enableLoggingToggle, 1, 1, 1, 1);

    this.settings.bind(
        'enable-logging',
        enableLoggingToggle,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );


    Logger.logMsg(`Building preferences widgets done`);

    return prefsWidget;
}