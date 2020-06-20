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
const Logger = Me.imports.logger;

let _mainBox;
let _avatar;
let _hostname;

var InfoMenuItem = GObject.registerClass(class InfoMenuItem extends PopupMenu.PopupBaseMenuItem {


    _init() {

        super._init({
            reactive: false,
            activate: false,
            hover: false,
            can_focus: false,
        });

        _mainBox = new St.BoxLayout({ vertical: true, width: 300, height: 200 });

        _hostname = this.executeCommand("hostname");

        // Create the header (Hostname and the Avatar Icon)
        this.createHeader();

        this.add_child(_mainBox);

    }

    executeCommand(command) {
        return imports.byteArray.toString(GLib.spawn_command_line_sync(command)[1]);
    }

    createHeader() {

        // Hostname in the header
        let headerBox = new St.BoxLayout({ width: 200 });
        headerBox.add(new St.Label({ text: _hostname, style: 'color:black;font-size:18px;font-weight:800;text-shadow: 0 0 3px #00FF00;' }), { expand: true });

        // User Avatar Icon
        let userManager = AccountsService.UserManager.get_default();
        userManager.list_users();
        let user = userManager.get_user(GLib.get_user_name());
        _avatar = new UserWidget.Avatar(user, { iconSize: 48 });
        _avatar.update();
        headerBox.add(_avatar);

        _mainBox.add(headerBox);
    }

    refresh() {

        _hostname = this.executeCommand("hostname");
        _avatar.update();

    }

});