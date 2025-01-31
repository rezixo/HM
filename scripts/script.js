function updateClock() {
    let now = new Date();
    let timeString = now.getHours() + ":" + now.getMinutes();
    document.getElementById('clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("start-menu-btn").addEventListener("click", function() {
    let menu = document.getElementById("start-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

// باز کردن و بستن برنامه‌ها
function openApp(appId) {
    const app = document.getElementById(appId);
    if (!app) return;

    app.style.display = 'block';
    app.style.zIndex = 100;  // پنجره باز شده همیشه در بالای پنجره‌های دیگر قرار گیرد
    app.classList.add('window-right');  // پنجره در سمت راست قرار می‌گیرد
}

function closeWindow(windowId) {
    const app = document.getElementById(windowId);
    if (app) {
        app.style.display = 'none';
    }
}

// قابلیت Drag and Drop برای جابجایی پنجره‌ها
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

makeDraggable('file-manager');  // پنجره مدیریت فایل‌ها را قابل جابجایی کنید
makeDraggable('calculator');  // پنجره ماشین حساب را قابل جابجایی کنید
makeDraggable('notepad');  // پنجره دفترچه یادداشت را قابل جابجایی کنید

// آپلود و نمایش فایل‌ها
function uploadFileToLocal() {
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            const fileName = file.name;

            let files = JSON.parse(localStorage.getItem("files")) || [];
            files.push({ name: fileName, content: fileContent });
            localStorage.setItem("files", JSON.stringify(files));

            displayFiles();
        };
        reader.readAsDataURL(file);
    }
}

function displayFiles() {
    const fileList = document.getElementById("fileList");
    const files = JSON.parse(localStorage.getItem("files")) || [];
    fileList.innerHTML = '';

    files.forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name;
        li.onclick = () => viewFile(file);
        fileList.appendChild(li);
    });
}

function viewFile(file) {
    alert(`محتوای فایل: ${file.content}`);
}

function deleteFile(fileName) {
    let files = JSON.parse(localStorage.getItem("files")) || [];
    files = files.filter(f => f.name !== fileName);
    localStorage.setItem("files", JSON.stringify(files));
    displayFiles();
}

displayFiles();  // نمایش فایل‌های ذخیره‌شده

// مدیریت سشن و خروج
function logout() {
    alert("شما از سیستم خارج شدید.");
}
