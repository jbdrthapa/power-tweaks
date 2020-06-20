const St = imports.gi.St;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;
const GObject = imports.gi.GObject;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;
const PowerTweaks = Me.imports.powerTweaks;
const Utilities = Me.imports.utilities;
const InfoMenuItem = Me.imports.infoMenuItem;

let _buttonIcon;
let _itemEnableAnimations;
let _itemCursorBlink;
let _itemClockShowSeconds;
let _infoMenu;

var MainIndicator = GObject.registerClass(class MainIndicator extends PanelMenu.Button {

    _init() {

        super._init(0.0);

        this.style_class = 'panel-button';

        _buttonIcon = PowerTweaks.getMainButtonIcon();

        this.add_child(_buttonIcon);

        _infoMenu = new InfoMenuItem.InfoMenuItem();
        this.menu.addMenuItem(_infoMenu);

        let subMenu = new PopupMenu.PopupSubMenuMenuItem(_("Settings Tweaks"));
        this.menu.addMenuItem(subMenu);

        // item = new PopupMenu.PopupImageMenuItem(_("Animations"), "dialog-question");
        // item.connect('activate', Lang.bind(this, function () { Utilities.notify("Message", "Details", "avatar-default") }));
        // subMenu.menu.addMenuItem(item);

        // Enable Animations
        let enableAnimationsInitValue = PowerTweaks.getTweakSettingCurrentState("enable-animations");
        _itemEnableAnimations = new PopupMenu.PopupSwitchMenuItem(_("Enable Animations"), enableAnimationsInitValue);
        _itemEnableAnimations.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("enable-animations", _itemEnableAnimations.state) }));
        subMenu.menu.addMenuItem(_itemEnableAnimations);

        // Cursor Blink
        let cursorBlinkInitValue = PowerTweaks.getTweakSettingCurrentState("cursor-blink");
        _itemCursorBlink = new PopupMenu.PopupSwitchMenuItem(_("Cursor Blink"), cursorBlinkInitValue);
        _itemCursorBlink.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("cursor-blink", _itemCursorBlink.state) }));
        subMenu.menu.addMenuItem(_itemCursorBlink);

        // Clock Show Seconds
        let clockShowSecondsInitValue = PowerTweaks.getTweakSettingCurrentState("clock-show-seconds");
        _itemClockShowSeconds = new PopupMenu.PopupSwitchMenuItem(_("Clock Show Seconds"), clockShowSecondsInitValue);
        _itemClockShowSeconds.connect('toggled', Lang.bind(this, function () { PowerTweaks.setTweakSettingCurrentState("clock-show-seconds", _itemClockShowSeconds.state) }));
        subMenu.menu.addMenuItem(_itemClockShowSeconds);

        // Separater Banner
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem("Power Tweaks"));

    }

    refreshInfoUI(){

        _infoMenu.refresh();

    }

    refreshSettingsUI() {

        var isOnAC = PowerTweaks.getPowerState() === PowerTweaks.PowerStates.AC;

        _itemEnableAnimations.setToggleState(isOnAC);
        _itemCursorBlink.setToggleState(isOnAC);
        _itemClockShowSeconds.setToggleState(isOnAC);
    }

    refreshButtonUI() {

        this.remove_child(_buttonIcon);

        _buttonIcon = PowerTweaks.getMainButtonIcon();

        this.add_child(_buttonIcon);

    }

});