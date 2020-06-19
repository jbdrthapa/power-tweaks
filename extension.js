const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;
const Utilities = Me.imports.utilities;
const PowerTweaks = Me.imports.powerTweaks;

let text;
let button;
let _buttonIcon;
let _handle;
let _mainIndicator;
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

        menuItem.connect('button-press-event', function () { Utilities.notify("Message", "Details", "avatar-default") });

        this.menu.addMenuItem(menuItem);

    },



    refreshButtonUI: function () {

        this.remove_child(_buttonIcon);

        _buttonIcon = Utilities.getMainButtonIcon();

        this.add_child(_buttonIcon);

    }

});

function OnPowerPropertiesChanged() {

    // Check and make sure there is a state change
    if (_lastPowerState === Utilities.getPowerState()) {

        return;

    }

    _lastPowerState = Utilities.getPowerState();

    PowerTweaks.tweakSettings(_lastPowerState);

    Logger.logMsg("Refreshing icon, on power management changed");

    _mainIndicator.refreshButtonUI();

    Logger.logMsg("Refreshing icon completed");

    Utilities.notify("Notification", `System is running on : ${_lastPowerState}`, "avatar-default")

}

function init() {

    Logger.logMsg(`Initializing ${Me.metadata.name} Version ${Me.metadata.version}`);


    Logger.logMsg("Application initialized");
}

function enable() {

    Logger.logMsg("Enabling application");

    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', OnPowerPropertiesChanged);

    // Capture the initial settings
    PowerTweaks.captureInitialSettings();

    // Main indicator
    _mainIndicator = new MainIndicator();

    // store the initial power state
    _lastPowerState = Utilities.getPowerState();

    Main.panel._addToPanelBox('MainIndicator', _mainIndicator, 1, Main.panel._rightBox);

    OnPowerPropertiesChanged();

    Logger.logMsg("Application enabled");

}

function disable() {

    Logger.logMsg("Exiting application");

    Main.panel.statusArea.aggregateMenu._power._proxy.disconnect(_handle);

    // Restore the initial settings
    PowerTweaks.restoreInitialSettings();

    _mainIndicator.destroy();

    Logger.logMsg("Application exited");

}
