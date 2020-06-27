const Me = imports.misc.extensionUtils.getCurrentExtension();
const Settings = Me.imports.lib.settings;

const ApplicationName = "Power Tweaks";

function logMsg(logMessage) {

    if (Settings.loggingEnabled() === false) {

        return;

    }

    log(`${ApplicationName} : ${logMessage}`);

}