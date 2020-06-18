const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

const Me = imports.misc.extensionUtils.getCurrentExtension();
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

        menuItem.actor.connect('button-press-event', function () { Main.notify('Example notification', 'Hello world!!!') });

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

    Utilities.logMsg("Refreshing icon, on power management changed");

    _mainIndicator.refreshButtonUI();

    Utilities.logMsg("Refreshing icon completed");

}

function init() {

    Utilities.logMsg(`Initializing ${Me.metadata.name} Version ${Me.metadata.version}`);


    Utilities.logMsg("Application initialized");
}

function enable() {

    Utilities.logMsg("Enabling application");

    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', OnPowerPropertiesChanged);

    // Capture the initial settings
    PowerTweaks.captureInitialSettings();

    // Main indicator
    _mainIndicator = new MainIndicator();

    // store the initial power state
    _lastPowerState = Utilities.getPowerState();

    Main.panel._addToPanelBox('MainIndicator', _mainIndicator, 1, Main.panel._rightBox);

    OnPowerPropertiesChanged();

    Utilities.logMsg("Application enabled");

}

function disable() {

    Utilities.logMsg("Exiting application");

    Main.panel.statusArea.aggregateMenu._power._proxy.disconnect(_handle);

    // Restore the initial settings
    PowerTweaks.restoreInitialSettings();

    _mainIndicator.destroy();

    Utilities.logMsg("Application exited");

}
