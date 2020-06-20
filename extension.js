const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;
const Utilities = Me.imports.utilities;
const PowerTweaks = Me.imports.powerTweaks;
const Indicator = Me.imports.indicator;

let _handle;
let _mainIndicator;
let _powerState;

function OnPowerPropertiesChanged() {


    if (_powerState === PowerTweaks.getPowerState()) {

        return;

    }

    _powerState = PowerTweaks.getPowerState();

    Logger.logMsg(`Power state changed to : ${_powerState}`)

    PowerTweaks.tweakSettings(_powerState);

    Logger.logMsg("Refreshing icon, on power management changed");

    _mainIndicator.refreshButtonUI();

    Logger.logMsg("Refreshing icon completed");

    Logger.logMsg("Refreshing settings UI");

    _mainIndicator.refreshSettingsUI();

    Logger.logMsg("Refreshing settings UI completed");

    Utilities.notify("Power state changed", `Power state changed to : ${_powerState}`, "battery")

}

function init() {

    Logger.logMsg(`Initializing ${Me.metadata.name} Version ${Me.metadata.version}`);


    Logger.logMsg("Application initialized");
}

function enable() {

    Logger.logMsg("Enabling application");

    // Capture the initial settings
    PowerTweaks.captureInitialSettings();

    // Main indicator
    _mainIndicator = new Indicator.MainIndicator();

    Main.panel._addToPanelBox('MainIndicator', _mainIndicator, 1, Main.panel._centerBox);

    OnPowerPropertiesChanged();

    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', OnPowerPropertiesChanged);

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