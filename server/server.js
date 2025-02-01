const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: "فایل با موفقیت آپلود شد" });
});

app.listen(port, () => {
    console.log(`سرور در حال اجرا روی پورت ${port}`);
});

const WebSocket = require('ws');
const fs = require('fs');
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    const fileName = `recordings/live_${Date.now()}.webm`;
    const fileStream = fs.createWriteStream(fileName);
    console.log("🎥 کاربر متصل شد و در حال ارسال ویدئو است.");

    ws.on('message', (data) => {
        fileStream.write(data); // ذخیره ویدئو در فایل
    });

    ws.on('close', () => {
        fileStream.end();
        console.log(`✅ ویدئو ذخیره شد: ${fileName}`);
    });
});
