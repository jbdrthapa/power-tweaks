const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;

const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const PowerTweaks = Me.imports.powerTweaks;

var SettingMenuItem = GObject.registerClass(class SettingMenuItem extends PopupMenu.PopupSwitchMenuItem {

    _init(caption, setting) {

        let initialValue = PowerTweaks.getTweakSettingCurrentState(setting);

        super._init(_(caption), initialValue);

        this.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState(setting, this.state) }));
    }

});