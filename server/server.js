const express = require('express');
const multer = require('multer');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const uploadDir = path.join(__dirname, 'uploads');
const recordingsDir = path.join(__dirname, 'recordings');

// پوشه‌های مورد نیاز را ایجاد کنید اگر وجود ندارند
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(recordingsDir)) fs.mkdirSync(recordingsDir);

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: "فایل با موفقیت آپلود شد", filename: req.file.filename });
});

app.get('/videos', (req, res) => {
    fs.readdir(recordingsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "خطا در دریافت لیست ویدئوها" });
        }
        res.json(files);
    });
});

app.listen(port, () => {
    console.log(`🚀 سرور در حال اجرا روی پورت ${port}`);
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    const fileName = path.join(recordingsDir, `live_${Date.now()}.webm`);
    const fileStream = fs.createWriteStream(fileName);
    console.log("🎥 کاربر متصل شد و در حال ارسال ویدئو است.");

    ws.on('message', (data) => {
        fileStream.write(data);
    });

    ws.on('close', () => {
        fileStream.end();
        console.log(`✅ ویدئو ذخیره شد: ${fileName}`);
    });
});
