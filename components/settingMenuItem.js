const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;

const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const PowerTweaks = Me.imports.components.powerTweaks;

var SettingMenuItem = GObject.registerClass(class SettingMenuItem extends PopupMenu.PopupSwitchMenuItem {

    _init(caption, setting) {

        let initialValue = PowerTweaks.getCurrentState(setting);

        super._init(_(caption), initialValue);

        this.connect('toggled', Lang.bind(this, function () { PowerTweaks.setCurrentState(setting, this.state) }));
    }

    refresh() {

        var isOnAC = PowerTweaks.getPowerState() === PowerTweaks.PowerStates.AC;

        this.setToggleState(isOnAC);
    }

});