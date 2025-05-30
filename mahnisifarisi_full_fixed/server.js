
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const formPath = "./formlar.json";

// GET: Get all forms
app.get("/api/formlar", (req, res) => {
  fs.readFile(formPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Xəta baş verdi");
    const parsed = JSON.parse(data);
    res.send(parsed.forms);
  });
});

// PUT: Replace all forms
app.put("/api/formlar", (req, res) => {
  const newForms = { forms: req.body };
  fs.writeFile(formPath, JSON.stringify(newForms, null, 2), (err) => {
    if (err) return res.status(500).send("Yazma xətası");
    res.send({ status: "Uğurla yadda saxlanıldı" });
  });
});

// POST: Add a new form
app.post("/api/formlar", (req, res) => {
  fs.readFile(formPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Oxuma xətası");
    const parsed = JSON.parse(data);
    parsed.forms.push(req.body);
    fs.writeFile(formPath, JSON.stringify(parsed, null, 2), (err) => {
      if (err) return res.status(500).send("Yazma xətası");
      res.send({ status: "Əlavə edildi" });
    });
  });
});

// DELETE: Remove form by index
app.delete("/api/formlar/:index", (req, res) => {
  fs.readFile(formPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Oxuma xətası");
    const parsed = JSON.parse(data);
    const index = parseInt(req.params.index);
    if (index >= 0 && index < parsed.forms.length) {
      parsed.forms.splice(index, 1);
      fs.writeFile(formPath, JSON.stringify(parsed, null, 2), (err) => {
        if (err) return res.status(500).send("Yazma xətası");
        res.send({ status: "Silindi" });
      });
    } else {
      res.status(404).send("Form tapılmadı");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server işləyir: http://localhost:${PORT}`);
});
