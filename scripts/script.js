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
