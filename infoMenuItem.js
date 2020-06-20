const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;
const AccountsService = imports.gi.AccountsService;

const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;
const UserWidget = imports.ui.userWidget;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;


var InfoMenuItem = GObject.registerClass(class InfoMenuItem extends PopupMenu.PopupBaseMenuItem {

    _init() {

        super._init();

        this._mainBox = new St.BoxLayout({ vertical: true, width: 300, height: 200 });

        // Create the header (Hostname and the Avatar Icon)
        this.createHeader();

        this.add_child(this._mainBox);

    }

    createHeader() {

        // Hostname
        let title = GLib.spawn_command_line_sync("hostname")[1].toString();
        let headerBox = new St.BoxLayout({ width: 200 });
        headerBox.add(new St.Label({ text: title, style: 'color:black;font-size:18px;font-weight:800;text-shadow: 0 0 3px #00FF00;' }), { expand: true });

        // User Avatar Icon
        let userManager = AccountsService.UserManager.get_default();
        userManager.list_users();
        let user = userManager.get_user(GLib.get_user_name());
        let avatar = new UserWidget.Avatar(user, { iconSize: 48 });
        avatar.update();
        headerBox.add(avatar);

        this._mainBox.add(headerBox);
    }

});