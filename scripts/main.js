// برای باز کردن و بستن پنجره‌ها
function openApp(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'block';
        app.style.zIndex = 100;
    }
}

function closeWindow(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'none';
    }
}

// برای ساعت
function updateClock() {
    let now = new Date();
    let timeString = now.getHours() + ":" + now.getMinutes();
    document.getElementById('clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// برای اپلیکیشن‌ها
function uploadFile() {
    let fileInput = document.getElementById("fileUpload").files[0];
    if (fileInput) {
        let li = document.createElement("li");
        li.innerText = fileInput.name;
        document.getElementById("fileList").appendChild(li);
    }
}

// برای جابجایی پنجره‌ها
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

makeDraggable('file-manager');
