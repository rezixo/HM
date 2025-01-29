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
