const St = imports.gi.St;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;
const PowerTweaks = Me.imports.powerTweaks;
const Utilities = Me.imports.utilities;

let _buttonIcon;


var MainIndicator = new Lang.Class({
    Name: 'Main.indicator',
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent(0.0);

        this.style_class = 'panel-button';

        _buttonIcon = PowerTweaks.getMainButtonIcon();

        this.add_child(_buttonIcon);

        let subMenu = new PopupMenu.PopupSubMenuMenuItem(_("Settings Tweaks"));
        this.menu.addMenuItem(subMenu);

        // item = new PopupMenu.PopupImageMenuItem(_("Animations"), "dialog-question");
        // item.connect('activate', Lang.bind(this, function () { Utilities.notify("Message", "Details", "avatar-default") }));
        // subMenu.menu.addMenuItem(item);

        // Enable Animations
        var enableAnimationsInitValue = PowerTweaks.getTweakSettingCurrentState("enable-animations");
        let itemEnableAnimations = new PopupMenu.PopupSwitchMenuItem(_("Enable Animations"), enableAnimationsInitValue);
        itemEnableAnimations.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("enable-animations", itemEnableAnimations.state) }));
        subMenu.menu.addMenuItem(itemEnableAnimations);

        // Cursor Blink
        var cursorBlinkInitValue = PowerTweaks.getTweakSettingCurrentState("cursor-blink");
        let itemCursorBlink = new PopupMenu.PopupSwitchMenuItem(_("Cursor Blink"), cursorBlinkInitValue);
        itemCursorBlink.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("cursor-blink", itemCursorBlink.state) }));
        subMenu.menu.addMenuItem(itemCursorBlink);

        // Clock Show Seconds
        var clockShowSecondsInitValue = PowerTweaks.getTweakSettingCurrentState("clock-show-seconds");
        let itemClockShowSeconds = new PopupMenu.PopupSwitchMenuItem(_("Clock Show Seconds"), clockShowSecondsInitValue);
        itemClockShowSeconds.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("clock-show-seconds", itemClockShowSeconds.state) }));
        subMenu.menu.addMenuItem(itemClockShowSeconds);

        // Separater Banner
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem("Power Tweaks"));
    },



    refreshButtonUI: function () {

        this.remove_child(_buttonIcon);

        _buttonIcon = PowerTweaks.getMainButtonIcon();

        this.add_child(_buttonIcon);

    }

});