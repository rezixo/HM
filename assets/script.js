// ساعت و منوی استارت
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

// باز و بسته کردن پنجره‌ها
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

// ضبط پیام صوتی
let mediaRecorder;
let audioChunks = [];

function startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                document.getElementById('stop-btn').disabled = false;
                mediaRecorder.ondataavailable = function(event) {
                    audioChunks.push(event.data);
                };
            })
            .catch(function(err) {
                alert("خطا در دسترسی به میکروفون.");
            });
    }
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('stop-btn').disabled = true;

    mediaRecorder.onstop = function() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.style.display = 'block';
        audioPlayer.src = audioUrl;
        audioChunks = [];
    };
}

// تماس تصویری
let userStream;
let partnerStream;

function startVideoCall() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function(stream) {
                userStream = stream;
                const userVideo = document.getElementById('user-video');
                userVideo.srcObject = stream;

                partnerStream = stream; 
                const partnerVideo = document.getElementById('partner-video');
                partnerVideo.srcObject = partnerStream;
            })
            .catch(function(err) {
                alert("خطا در دسترسی به وبکم یا میکروفون.");
            });
    }
}

// گالری تصاویر
function displayImages() {
    const imageGallery = document.getElementById('image-gallery');
    const images = JSON.parse(localStorage.getItem("images")) || [];
    imageGallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;
        imgElement.onclick = function() {
            showLargeImage(image.src);
        };
        imageGallery.appendChild(imgElement);
}

function showLargeImage(src) {
    const imgWindow = window.open("", "Image Viewer", "width=600,height=600");
    imgWindow.document.write('<img src="' + src + '" style="width:100%;height:auto;">');
}

function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = {
                name: file.name,
                src: e.target.result
            };
            let images = JSON.parse(localStorage.getItem("images")) || [];
            images.push(img);
            localStorage.setItem("images", JSON.stringify(images));
            displayImages();
        };
        reader.readAsDataURL(file);
    }
}

// نوتیفیکیشن‌ها
function sendNotification(message) {
    const notificationList = document.getElementById('notification-list');
    const notification = document.createElement('p');
    notification.textContent = message;
    notificationList.appendChild(notification);
}

setInterval(() => {
    sendNotification("این یک نوتیفیکیشن آزمایشی است.");
}, 5000);
