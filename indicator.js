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
const SettingMenuItem = Me.imports.settingMenuItem;

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

        // Setting enble-animations
        _itemEnableAnimations = new SettingMenuItem.SettingMenuItem("Enable Animations", "enable-animations");
        subMenu.menu.addMenuItem(_itemEnableAnimations);

        // Setting cursor-blink
        _itemCursorBlink = new SettingMenuItem.SettingMenuItem("Cursor Blink", "cursor-blink");
        subMenu.menu.addMenuItem(_itemCursorBlink);

        // Setting clock-show-seconds
        _itemClockShowSeconds = new SettingMenuItem.SettingMenuItem("Clock Show Seconds", "clock-show-seconds");
        subMenu.menu.addMenuItem(_itemClockShowSeconds);

        // Separater Banner
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem("POWER TWEAKS"));

    }

    refreshInfoUI() {

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