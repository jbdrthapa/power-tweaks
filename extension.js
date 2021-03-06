const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();

const Logger = Me.imports.lib.logger;
const Utilities = Me.imports.lib.utilities;
const Settings = Me.imports.lib.settings;
const UPowerClient = Me.imports.lib.upowerClient;
const DisplayClient = Me.imports.lib.displayClient;

const PowerTweaks = Me.imports.components.powerTweaks;
const Indicator = Me.imports.components.indicator;

let _handle;
let _mainIndicator;
let _powerState;


function OnPowerPropertiesChanged() {

    // Check if it should react on power management events
    if (Settings.ReactOnPMEvents() !== true) {

        return;

    }

    // Check if the state before and after the change are the same
    if (_powerState === PowerTweaks.getPowerState()) {

        return;

    }

    _powerState = PowerTweaks.getPowerState();

    Logger.logMsg(`Power state changed to : ${_powerState}`)

    PowerTweaks.refreshSettings();

    Logger.logMsg("Refreshing icon, on power management changed");

    _mainIndicator.refreshButtonUI();

    Logger.logMsg("Refreshing icon completed");

    Logger.logMsg("Refreshing settings UI");

    _mainIndicator.refreshSettingsUI();

    Logger.logMsg("Refreshing settings UI completed");

}

function init() {

    Logger.logMsg(`Initializing ${Me.metadata.name} Version ${Me.metadata.version}`);

    Logger.logMsg("Application initialized");
}

function enable() {

    Logger.logMsg("Enabling application");

    // Capture the initial settings
    PowerTweaks.captureInitialSettings();

    var upowerClient = new UPowerClient.UPowerClient();

    Logger.logMsg(`System on battery: ${upowerClient.OnBattery}`);

    Logger.logMsg(`System Lid is present: ${upowerClient.LidIsPresent}`);

    //let [new_percentage, connector] = displayClient.StepUp();

    //Logger.logMsg(`New percentage : ${new_percentage} connected to : ${connector}`)


    // Main indicator
    _mainIndicator = new Indicator.MainIndicator();

    // Refresh all data
    _mainIndicator.connect('button-press-event', OnIndicatorDisplayChanged);

    // Add main indicator to the center box
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

function OnIndicatorDisplayChanged() {

    if (_mainIndicator.IsActive) {
        Logger.logMsg("====> Menu opened");
    }
    else {
        Logger.logMsg("====> Menu closed");
    }



    _mainIndicator.refreshInfoUI();

}