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
    const app = document.getElementById(appId);
    if (!app) return;

    app.style.display = 'block';
    app.style.zIndex = 100;  // پنجره باز شده همیشه در بالای پنجره‌های دیگر قرار گیرد
    app.classList.add('window-right');
}

function closeWindow(windowId) {
    const app = document.getElementById(windowId);
    if (app) {
        app.style.display = 'none';
    }
}

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
    alert(`محتوای فایل: ${file.content}`);
}

function saveNote() {
    const noteText = document.getElementById('noteText').value;
    alert(`یادداشت ذخیره شد: ${noteText}`);
}

function appendToDisplay(value) {
    document.getElementById('calculator-display').value += value;
}

function clearDisplay() {
    document.getElementById('calculator-display').value = '';
}

function calculateResult() {
    const display = document.getElementById('calculator-display');
    display.value = eval(display.value);
}

function logout() {
    alert("شما از سیستم خارج شدید.");
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = '';
}

function uploadImage() {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            document.getElementById("image-gallery").appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}
