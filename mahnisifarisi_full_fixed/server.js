const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Qiymet JSON yolu
const qiymetPath = "./qiymet.json";
const formlarPath = "./formlar.json";

// Qiymet oxu
app.get("/api/qiymet", (req, res) => {
    fs.readFile(qiymetPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        res.send(JSON.parse(data));
    });
});

// Qiymet yaz
app.put("/api/qiymet", (req, res) => {
    fs.writeFile(qiymetPath, JSON.stringify(req.body, null, 2), err => {
        if (err) return res.status(500).send("Yazılmadı!");
        res.send({ message: "Dəyişiklik yadda saxlanıldı!" });
    });
});

// Formlar oxu
app.get("/api/formlar", (req, res) => {
    fs.readFile(formlarPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        res.send(JSON.parse(data));
    });
});

// Formlar yaz
app.put("/api/formlar", (req, res) => {
    fs.writeFile(formlarPath, JSON.stringify(req.body, null, 2), err => {
        if (err) return res.status(500).send("Formlar saxlanmadı!");
        res.send({ message: "Formlar uğurla yadda saxlandı!" });
    });
});

// 🔥 Əlavə etdik: kök qovluqdakı fayllar (məsələn: cocuk.mp4) birbaşa təqdim olunsun
app.use(express.static(__dirname));

const fileUpload = require("express-fileupload");
const path = require("path");

app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fayl yükləmə
app.post("/api/upload", (req, res) => {
    if (!req.files || !req.files.video) {
        return res.status(400).send("Video faylı tapılmadı.");
    }
    const video = req.files.video;
    const uploadPath = path.join(__dirname, "uploads", video.name);

    video.mv(uploadPath, err => {
        if (err) return res.status(500).send("Yükləmə zamanı xəta baş verdi.");
        res.send({ message: "Video uğurla yükləndi!", filename: video.name, path: `/uploads/${video.name}` });
    });
});

// WhatsApp nömrəsini oxu
app.get("/api/whatsapp", (req, res) => {
    fs.readFile(formlarPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        try {
            const parsed = JSON.parse(data);
            res.send({ whatsapp: parsed.whatsapp || "" });
        } catch {
            res.status(500).send("JSON formatında xəta!");
        }
    });
});

// WhatsApp nömrəsini yaz
app.put("/api/whatsapp", (req, res) => {
    fs.readFile(formlarPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        try {
            const parsed = JSON.parse(data);
            parsed.whatsapp = req.body.whatsapp || "";
            fs.writeFile(formlarPath, JSON.stringify(parsed, null, 2), err => {
                if (err) return res.status(500).send("Yazılmadı!");
                res.send({ message: "WhatsApp nömrəsi yadda saxlandı!" });
            });
        } catch {
            res.status(500).send("JSON formatında xəta!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server işə düşdü: http://localhost:${port}`);
});
