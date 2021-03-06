const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;
const AccountsService = imports.gi.AccountsService;
const ByteArray = imports.byteArray;

const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;
const UserWidget = imports.ui.userWidget;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.lib.logger;
const DisplayClient = Me.imports.lib.displayClient;

const HostnameCommand = "hostname";
const UptimeCommand = "uptime -p";

let displayClient;
let _mainBox;
let _headerBox
let _uptimeInfoBox;
let _brightnessInfoBox;
let _avatar;
let _hostname;
let _uptime;
let _brightness;

var InfoMenuItem = GObject.registerClass(class InfoMenuItem extends PopupMenu.PopupBaseMenuItem {


    _init() {

        super._init({
            reactive: false,
            activate: false,
            hover: false,
            can_focus: false,
        });

        displayClient = new DisplayClient.DisplayClient();

        displayClient.addListener(displayClient.Events.BrightnessChanged, this._onBrightnessChanged);

        _mainBox = new St.BoxLayout({ vertical: true, width: 300, height: 400 });

        this.add_child(_mainBox);

        // Create the header (Hostname and the Avatar Icon)
        this._createHeader();

        this.refresh();

    }


    /* Refresh all data displayed */

    refresh() {

        this._refreshHostname();

        this._refreshUptime();

        this._refreshBrightness();

        _avatar.update();

    }

    /* Execute command and return the output of the command run */

    _executeCommand(command) {

        return imports.byteArray.toString(GLib.spawn_command_line_sync(command)[1]);

    }

    /* Create header */

    _createHeader() {

        // Hostname in the header
        _headerBox = new St.BoxLayout();
        _headerBox.add(new St.Label({ style_class: "hostname-header-style" }));

        // System uptime
        _uptimeInfoBox = new St.BoxLayout();
        _uptimeInfoBox.add(new St.Label({ text: "Uptime ", style_class: "info-label-style" }));
        _uptimeInfoBox.add(new St.Label());

        // System Brightness
        _brightnessInfoBox = new St.BoxLayout();
        _brightnessInfoBox.add(new St.Label({ text: "Brightness ", style_class: "info-label-style" }));
        _brightnessInfoBox.add(new St.Label());

        // User Avatar Icon
        let userManager = AccountsService.UserManager.get_default();
        userManager.list_users();
        let user = userManager.get_user(GLib.get_user_name());
        _avatar = new UserWidget.Avatar(user, { iconSize: 48 });
        _avatar.update();
        _headerBox.add(_avatar);

        _mainBox.add(_headerBox);
        _mainBox.add(_uptimeInfoBox);
        _mainBox.add(_brightnessInfoBox);
    }

    /* Get control from a layout using index */

    _getControlFromLayout(layout, index) {

        let uptimeInfoChildren = layout.get_children();

        return uptimeInfoChildren[index];

    }

    /* Refresh hostname */

    _refreshHostname() {

        _hostname = this._executeCommand(HostnameCommand);

        this._getControlFromLayout(_headerBox, 0).set_text(_hostname);

    }

    /* Refresh system uptime data */

    _refreshUptime() {

        _uptime = this._executeCommand(UptimeCommand).replace("up ", "");

        this._getControlFromLayout(_uptimeInfoBox, 1).set_text(_uptime);

    }

    /* Refresh the system brightness data */

    _getBrightnessValue() {

        let brightnessValue = "...";

        if (displayClient.Brightness) {

            let brightness = displayClient.Brightness;

            // When built-in display is turned off
            if (brightness === -1) {

                brightnessValue = "Off"

            }

            else {

                brightnessValue = `${brightness} %`;

            }

        }

        return brightnessValue;

    }

    _onBrightnessChanged(e) {

        this._refreshBrightness();

    }

    _refreshBrightness() {

        this._getControlFromLayout(_brightnessInfoBox, 1).set_text(this._getBrightnessValue());

    }

});