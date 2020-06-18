const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();

const Utilities = Me.imports.utilities;

let _animationsOriginalState;
let _cursorBlinkOriginalState;
let _showSecondsOriginalState;


function getDesktopInterfaceSettings() {

    const schema = Gio.SettingsSchemaSource.get_default().lookup('org.gnome.desktop.interface', false);

    if (schema) {

        return new Gio.Settings({ settings_schema: schema });

    }

}

function captureInitialSettings() {

    Utilities.logMsg("Capturing initial power tweak settings");

    const diSettings = getDesktopInterfaceSettings();

    if (diSettings) {

        // Capture animations initial settings
        _animationsOriginalState = diSettings.get_boolean('enable-animations');

        Utilities.logMsg(`enable-animations : ${_animationsOriginalState}`);

        // Capture cursor blink initial settings
        _cursorBlinkOriginalState = diSettings.get_boolean('cursor-blink');

        Utilities.logMsg(`cursor-blink : ${_cursorBlinkOriginalState}`);

        // Capture clock show seconds initial settings
        _showSecondsOriginalState = diSettings.get_boolean('clock-show-seconds');

        Utilities.logMsg(`clock-show-seconds : ${_showSecondsOriginalState}`);

    }

    Utilities.logMsg("Capturing initial power tweak settings done");

}

function restoreInitialSettings() {

    Utilities.logMsg("Restoring power tweak settings with initial values");

    const diSettings = getDesktopInterfaceSettings();

    if (diSettings) {

        // Restore animations to initial settings
        diSettings.set_boolean('enable-animations', _animationsOriginalState);

        Utilities.logMsg(`enable-animations : ${_animationsOriginalState}`);

        // Restore cursor blink to initial settings
        diSettings.set_boolean('cursor-blink', _cursorBlinkOriginalState);

        Utilities.logMsg(`cursor-blink : ${_cursorBlinkOriginalState}`);

        // Restore clock show seconds to initial settings
        diSettings.set_boolean('clock-show-seconds', _showSecondsOriginalState);

        Utilities.logMsg(`clock-show-seconds : ${_showSecondsOriginalState}`);

    }

    Utilities.logMsg("Restoring power tweak settings with initial values done");

}

function tweakSettings(powerState) {

    const diSettings = getDesktopInterfaceSettings();

    if (diSettings) {

        var isOnAc = powerState === Utilities.PowerStates.AC;

        // Enable/Disable animations
        diSettings.set_boolean('enable-animations', isOnAc);

        Utilities.logMsg(`enable-animations : ${isOnAc}`);

        // Enable/Disable cursor blink
        diSettings.set_boolean('cursor-blink', isOnAc);

        Utilities.logMsg(`cursor-blink : ${isOnAc}`);

        // Enable/Disable clock show seconds
        diSettings.set_boolean('clock-show-seconds', isOnAc);

        Utilities.logMsg(`clock-show-seconds : ${isOnAc}`);
    }

}

