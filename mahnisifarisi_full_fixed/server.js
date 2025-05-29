const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// JSON fayl yolları
const paths = {
  qiymet: path.join(__dirname, 'qiymet.json'),
  elaqe: path.join(__dirname, 'elaqe.json'),
  formlar: path.join(__dirname, 'formlar.json')
};

// JSON faylını oxuma funksiyası
const readData = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// GET routeları
app.get('/api/qiymet', (req, res) => {
  res.json(readData(paths.qiymet));
});

app.get('/api/elaqe', (req, res) => {
  res.json(readData(paths.elaqe));
});

app.get('/api/formlar', (req, res) => {
  res.json(readData(paths.formlar));
});

// PUT routeları
app.put('/api/qiymet', (req, res) => {
  fs.writeFileSync(paths.qiymet, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.put('/api/elaqe', (req, res) => {
  fs.writeFileSync(paths.elaqe, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.put('/api/formlar', (req, res) => {
  fs.writeFileSync(paths.formlar, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Əsas səhifəyə yönləndirmə (optional)
app.get('/', (req, res) => {
  res.send('✅ API server işləyir.');
});

app.listen(port, () => {
  console.log(`🚀 Server http://localhost:${port} üzərində işləyir`);
});