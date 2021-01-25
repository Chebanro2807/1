function sendNotification(title, options) {
    if (!("Notification" in window)) {
    alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
    }

    else if (Notification.permission === "granted") {
    var notification = new Notification(title, options);
    function clickFunc() { alert('Пользователь кликнул на уведомление'); }
    notification.onclick = clickFunc;
    }
    
    else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

    if (permission === "granted") {
    var notification = new Notification(title, options);
    
    } else {
    alert('Вы запретили показывать уведомления'); 
    }
    });
    } else {
    
    }
}
sendNotification('Домашнее задание', {
    body: 'Сделано.',
    icon: 'icons/School.png',
    dir: 'auto'
    });