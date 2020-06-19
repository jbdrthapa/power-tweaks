
const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const UPower = imports.ui.status.power.UPower;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;


var PowerStates = {
    AC: 'AC',
    BATT: 'BATT'
}

function getPowerState() {

    var isOnAC = Main.panel.statusArea.aggregateMenu._power._proxy.State !== UPower.DeviceState.DISCHARGING;

    if (isOnAC === true) {
        return PowerStates.AC;
    }
    else {
        return PowerStates.BATT;
    }

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

    var iconPath = `${Me.path}${iconImageRelativePath}`;

    Logger.logMsg(`Icon Path: ${iconPath}`);

    icon.gicon = Gio.icon_new_for_string(iconPath);

    return icon;

};