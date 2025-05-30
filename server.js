const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Qiymet JSON yolu
const qiymetPath = "./qiymet.json";

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

app.listen(port, () => {
    console.log(`Server işə düşdü: http://localhost:${port}`);
});