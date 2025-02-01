let stream;
let mediaRecorder;
let socket = new WebSocket("wss://yourserver.com/live");

async function startLiveStream() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('liveStream').srcObject = stream;

        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                socket.send(event.data); // ارسال داده به سرور
            }
        };

        mediaRecorder.start(1000);
    } catch (err) {
        alert("دسترسی به دوربین/میکروفون ممکن نیست!");
    }
}

function stopLiveStream() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
    }
}
