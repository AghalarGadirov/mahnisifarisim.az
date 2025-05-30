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

// WhatsApp nömrəsini oxu
app.get("/api/whatsapp", (req, res) => {
    fs.readFile(formlarPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        const jsonData = JSON.parse(data);
        res.send({ whatsapp: jsonData.whatsapp || "" });
    });
});

// WhatsApp nömrəsini yaz
app.put("/api/whatsapp", (req, res) => {
    fs.readFile(formlarPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Xəta baş verdi!");
        const jsonData = JSON.parse(data);
        jsonData.whatsapp = req.body.whatsapp;
        fs.writeFile(formlarPath, JSON.stringify(jsonData, null, 2), err => {
            if (err) return res.status(500).send("Yazılmadı!");
            res.send({ message: "WhatsApp nömrəsi yeniləndi!" });
        });
    });
});

    });
});

app.listen(port, () => {
    console.log(`Server işə düşdü: http://localhost:${port}`);
});