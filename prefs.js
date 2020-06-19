'use strict';

const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;

function init() {
    Logger.logMsg(`Initializing ${Me.metadata.name} Preferences`);
}

function buildPrefsWidget() {

    Logger.logMsg(`Building preferences widgets`);

    let prefsWidget = new Gtk.Label({
        label: `${Me.metadata.name} version ${Me.metadata.version}`,
        visible: true
    });

    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 0, () => {
        let window = prefsWidget.get_topLevel();
        let headerBar = window.get_titlebar();
        headerBar.title = `${Me.metadata.name} Preferences`;
    });

    Logger.logMsg(`Building preferences widgets done`);

    return prefsWidget;
}