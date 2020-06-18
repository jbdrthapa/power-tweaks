const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Utilities = Me.imports.utilities;

let text;
let button;
let _buttonIcon;

let _handle;
let _mainIndicator;
let _animationsOriginalState;
let _cursorBlinkOriginalState;
let _clockShowSeconds;
let _lastPowerState;


const MainIndicator = new Lang.Class({
    Name: 'Main.indicator',
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent(0.0);

        this.style_class = 'panel-button';

        _buttonIcon = Utilities.getMainButtonIcon();

        this.add_child(_buttonIcon);

        let menuItem = new PopupMenu.PopupMenuItem('Menu Item');

        menuItem.actor.connect('button-press-event', function () { Main.notify('Example notification', 'Hello world!!!') });

        this.menu.addMenuItem(menuItem);

    },



    refreshButtonUI: function () {

        this.remove_child(_buttonIcon);

        _buttonIcon = Utilities.getMainButtonIcon();

        this.add_child(_buttonIcon);

    },



});

function getDesktopInterfaceSettings() {

    const schema = Gio.SettingsSchemaSource.get_default().lookup('org.gnome.desktop.interface', false);

    if (schema) {

        return new Gio.Settings({ settings_schema: schema });

    }

}


function OnPowerPropertiesChanged() {

    // Check and make sure there is a state change
    if (_lastPowerState === Utilities.getPowerState()) {

        return;

    }

    _lastPowerState = Utilities.getPowerState();

    const diSettings = getDesktopInterfaceSettings();

    Utilities.logMsg("Refreshing icon, on power management changed");

    _mainIndicator.refreshButtonUI();

    Utilities.logMsg("Refreshing icon completed");

    if (diSettings) {

        // Is the system on AC
        var isOnAc = _lastPowerState === Utilities.PowerStates.AC;

        // Enable/Disable animations
        diSettings.set_boolean('enable-animations', isOnAc);

        // Enable/Disable cursor blink
        diSettings.set_boolean('cursor-blink', isOnAc);

        // Enable/Disable clock show seconds
        diSettings.set_boolean('clock-show-seconds', isOnAc);

    }

}



function init() {

    Utilities.logMsg(`Initializing ${Me.metadata.name} Version ${Me.metadata.version}`);


    Utilities.logMsg("Application initialized");
}

function enable() {

    Utilities.logMsg("Enabling application");

    // Main indicator
    _mainIndicator = new MainIndicator();

    _lastPowerState = Utilities.getPowerState();

    const diSettings = getDesktopInterfaceSettings();

    _animationsOriginalState = diSettings.get_boolean('enable-animations');

    _cursorBlinkOriginalState = diSettings.get_boolean('cursor-blink');

    _clockShowSeconds = diSettings.get_boolean('clock-show-seconds');

    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', OnPowerPropertiesChanged);

    Main.panel._addToPanelBox('MainIndicator', _mainIndicator, 1, Main.panel._rightBox);

    OnPowerPropertiesChanged();

    Utilities.logMsg("Application enabled");

}

function disable() {

    Utilities.logMsg("Exiting application");

    const diSettings = getDesktopInterfaceSettings();

    if (diSettings) {

        diSettings.set_boolean('enable-animations', _animationsOriginalState);

        diSettings.set_boolean('cursor-blink', _cursorBlinkOriginalState);

        diSettings.set_boolean('clock-show-seconds', _clockShowSeconds);

    }

    Main.panel.statusArea.aggregateMenu._power._proxy.disconnect(_handle);

    _mainIndicator.destroy();

    Utilities.logMsg("Application exited");

}
