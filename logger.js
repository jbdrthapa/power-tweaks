const Me = imports.misc.extensionUtils.getCurrentExtension();
const Settings = Me.imports.settings;

const ApplicationName = "Power Tweaks";

function logMsg(logMessage) {

    log(`Logging enabled: ${Settings.application.loggingEnabled.call()}`);

    if (Settings.application.loggingEnabled.call() === false) {

        return;

    }
    log(`${ApplicationName} : ${logMessage}`);
}