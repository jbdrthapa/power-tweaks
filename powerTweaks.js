const St = imports.gi.St;
const Gio = imports.gi.Gio;
const UPower = imports.gi.UPowerGlib;

const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Utilities = Me.imports.utilities;
const Logger = Me.imports.logger;

let _animationsOriginalState;
let _cursorBlinkOriginalState;
let _showSecondsOriginalState;

var PowerStates = {
    AC: 'AC',
    BATT: 'BATT'
}

function getPowerState() {

    let isOnAC = Main.panel.statusArea.aggregateMenu._power._proxy.State !== UPower.DeviceState.DISCHARGING;

    if (isOnAC === true) {
        return PowerStates.AC;
    }
    else {
        return PowerStates.BATT;
    }

}

function getDesktopInterfaceSettings() {

    const schema = Gio.SettingsSchemaSource.get_default().lookup('org.gnome.desktop.interface', false);

    if (schema) {

        return new Gio.Settings({ settings_schema: schema });

    }

}

function getCurrentState(setting) {

    const diSettings = getDesktopInterfaceSettings();

    var settingValue = diSettings.get_boolean(setting);

    Logger.logMsg(`Getting the current state of setting : ${setting} value: ${settingValue}`);

    return settingValue;

}

function setCurrentState(setting, settingValue) {

    const diSettings = getDesktopInterfaceSettings();

    diSettings.set_boolean(setting, settingValue)

    Logger.logMsg(`Setting the current state of setting : ${setting} value: ${settingValue}`);

}


function getMainButtonIcon() {

    let iconImageRelativePath;

    if (getPowerState() === PowerStates.AC) {

        iconImageRelativePath = '/icons/charging_24.png';
    }
    else {

        iconImageRelativePath = '/icons/battery_24.png';

    }

    let icon = new St.Icon({ style_class: 'system-status-icon' });

    let iconPath = `${Me.path}${iconImageRelativePath}`;

    Logger.logMsg(`Icon Path: ${iconPath}`);

    icon.gicon = Gio.icon_new_for_string(iconPath);

    return icon;

};

function captureInitialSettings() {

    Logger.logMsg("Capturing initial power tweak settings");

    // Capture animations initial settings
    _animationsOriginalState = getCurrentState('enable-animations');

    // Capture cursor blink initial settings
    _cursorBlinkOriginalState = getCurrentState('cursor-blink');

    // Capture clock show seconds initial settings
    _showSecondsOriginalState = getCurrentState('clock-show-seconds');

    Logger.logMsg("Capturing initial power tweak settings done");

}

function restoreInitialSettings() {

    Logger.logMsg("Restoring power tweak settings with initial values");

    // Restore animations to initial settings
    setCurrentState('enable-animations', _animationsOriginalState);

    // Restore cursor blink to initial settings
    setCurrentState('cursor-blink', _cursorBlinkOriginalState);

    // Restore clock show seconds to initial settings
    setCurrentState('clock-show-seconds', _showSecondsOriginalState);

    Logger.logMsg("Restoring power tweak settings with initial values done");

}

function refreshSettings() {

    var isOnAc = getPowerState() === PowerStates.AC;

    // Set enable-animations
    setCurrentState('enable-animations', isOnAc);

    // Set cursor-blink
    setCurrentState('cursor-blink', isOnAc);

    // Set clock-show-seconds
    setCurrentState('clock-show-seconds', isOnAc);

}
