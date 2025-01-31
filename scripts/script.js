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

function openApp(appId) {
    document.getElementById(appId).style.display = "block";
}

function closeWindow(windowId) {
    document.getElementById(windowId).style.display = "none";
}

function uploadFile() {
    let fileInput = document.getElementById("fileUpload").files[0];
    if (fileInput) {
        let li = document.createElement("li");
        li.innerText = fileInput.name;
        document.getElementById("fileList").appendChild(li);
    }
}
// 1. باز کردن و بستن برنامه‌ها
function openApp(appId) {
    const app = document.getElementById(appId);
    if (!app) return;

    app.style.display = 'block';
    app.style.zIndex = 100;  // پنجره باز شده همیشه در بالای پنجره‌های دیگر قرار گیرد
}

function closeWindow(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'none';
    }
}

// 2. قابلیت Drag and Drop برای جابجایی پنجره‌ها
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

// 3. تایمر و نمایش ساعت
function startTimer() {
    let time = 0;
    const timerDisplay = document.getElementById("clock");

    setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

startTimer();  // شروع تایمر در منوی استارت

// 4. آپلود و نمایش فایل‌ها
function uploadFile() {
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
    // نمایش محتوای فایل
    alert(`محتوای فایل: ${file.content}`);
}

function deleteFile(fileName) {
    let files = JSON.parse(localStorage.getItem("files")) || [];
    files = files.filter(f => f.name !== fileName);
    localStorage.setItem("files", JSON.stringify(files));
    displayFiles();
}

displayFiles();  // نمایش فایل‌های ذخیره‌شده

// 5. ایجاد پوشه‌ها و نمایش آن‌ها
function createFolder(folderName) {
    const folders = JSON.parse(localStorage.getItem("folders")) || [];
    folders.push({ name: folderName, files: [] });
    localStorage.setItem("folders", JSON.stringify(folders));
    displayFolders();
}

function displayFolders() {
    const folderList = document.getElementById("folderList");
    const folders = JSON.parse(localStorage.getItem("folders")) || [];
    folderList.innerHTML = '';

    folders.forEach(folder => {
        const li = document.createElement("li");
        li.textContent = folder.name;
        folderList.appendChild(li);
    });
}

// 6. اضافه کردن ذخیره‌سازی ابری (برای مثال Google Drive API)
function uploadToCloud() {
    // این بخش به API ذخیره‌سازی ابری شما بستگی دارد
    alert("امکانات ذخیره‌سازی ابری در حال حاضر غیرفعال است.");
}

// 7. رمزنگاری داده‌ها (برای امنیت بیشتر)
function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

function decryptData(encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// 8. مدیریت چند پنجره (Multi-window)
function openMultipleWindows() {
    const windows = ['file-manager', 'notepad', 'calculator'];
    windows.forEach(appId => {
        openApp(appId);
    });
}

document.getElementById("start-menu-btn").addEventListener('click', function() {
    document.getElementById('start-menu').style.display = 'block';
});

document.getElementById("fileUpload").addEventListener('change', uploadFile);

// 9. مدیریت سشن و خروج
function logout() {
    // عملیات لازم برای خروج از سشن
    alert("شما از سیستم خارج شدید.");
}
