
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

// Qiymet endpointləri
const qiymetPath = "./qiymet.json";
app.get("/api/qiymet", (req, res) => {
  fs.readFile(qiymetPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Qiymətlər oxunmadı!");
    res.send(JSON.parse(data));
  });
});
app.put("/api/qiymet", (req, res) => {
  fs.writeFile(qiymetPath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send("Qiymətlər yazılmadı!");
    res.send({ message: "Qiymətlər yadda saxlanıldı!" });
  });
});

// Əlaqə endpointləri
const elaqePath = "./elaqe.json";
app.get("/api/elaqe", (req, res) => {
  fs.readFile(elaqePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Əlaqə oxunmadı!");
    res.send(JSON.parse(data));
  });
});
app.put("/api/elaqe", (req, res) => {
  fs.writeFile(elaqePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send("Əlaqə yazılmadı!");
    res.send({ message: "Əlaqə məlumatları yadda saxlanıldı!" });
  });
});

// Formlar endpointləri
const formlarPath = "./formlar.json";
app.get("/api/formlar", (req, res) => {
  fs.readFile(formlarPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Formları oxumaqda xəta!");
    res.send(JSON.parse(data));
  });
});
app.put("/api/formlar", (req, res) => {
  fs.writeFile(formlarPath, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send("Formlar yazılmadı!");
    res.send({ message: "Formlar yadda saxlanıldı!" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server işə düşdü: " + PORT);
});
