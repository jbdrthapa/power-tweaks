const Main = imports.ui.main;
const MessageTray = imports.ui.messageTray;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Logger = Me.imports.logger;

function notify(title, message, iconName) {

    let source = new MessageTray.Source(title, iconName);

    let notification = new MessageTray.Notification(source, title, message);

    notification.setTransient(true);

    Main.messageTray.add(source);

    source.pushNotification(notification);
}