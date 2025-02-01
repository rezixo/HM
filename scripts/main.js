// نمایش یا مخفی‌سازی منوی استارت
document.getElementById("start-menu-btn").addEventListener('click', function() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu.style.display === 'none' || startMenu.style.display === '') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
});

// باز کردن برنامه
function openApp(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'block';
        app.style.zIndex = 100;  // پنجره باز شده همیشه در بالای پنجره‌های دیگر قرار گیرد
    }
}

// بستن برنامه
function closeWindow(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'none';
    }
}

// قابلیت جابجایی پنجره‌ها
function makeDraggable(elementId) {
    const elem = document.getElementById(elementId);
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    elem.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - elem.getBoundingClientRect().left;
        offsetY = e.clientY - elem.getBoundingClientRect().top;
        document.onmousemove = dragMove;
        document.onmouseup = dragEnd;
    };

    function dragMove(e) {
        if (isDragging) {
            elem.style.left = e.clientX - offsetX + 'px';
            elem.style.top = e.clientY - offsetY + 'px';
        }
    }

    function dragEnd() {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

// اعمال قابلیت جابجایی به پنجره‌های برنامه‌ها
makeDraggable('file-manager');
makeDraggable('notepad');
makeDraggable('calculator');
