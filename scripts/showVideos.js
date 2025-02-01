async function loadVideos() {
    const response = await fetch('/videos');
    const videos = await response.json();
    const container = document.getElementById('videoList');
    container.innerHTML = "";

    videos.forEach(video => {
        const videoElement = document.createElement('video');
        videoElement.src = `/recordings/${video}`;
        videoElement.controls = true;
        container.appendChild(videoElement);
    });
}

loadVideos();
