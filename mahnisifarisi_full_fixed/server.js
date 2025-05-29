const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dataPath = path.join(__dirname, 'data');

app.get('/api/qiymet', (req, res) => {
  const data = fs.readFileSync(path.join(dataPath, 'qiymet.json'));
  res.json(JSON.parse(data));
});

app.post('/api/qiymet', (req, res) => {
  fs.writeFileSync(path.join(dataPath, 'qiymet.json'), JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get('/api/elaqe', (req, res) => {
  const data = fs.readFileSync(path.join(dataPath, 'elaqe.json'));
  res.json(JSON.parse(data));
});

app.post('/api/elaqe', (req, res) => {
  fs.writeFileSync(path.join(dataPath, 'elaqe.json'), JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get('/api/formlar', (req, res) => {
  const data = fs.readFileSync(path.join(dataPath, 'formlar.json'));
  res.json(JSON.parse(data));
});

app.post('/api/formlar', (req, res) => {
  fs.writeFileSync(path.join(dataPath, 'formlar.json'), JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('✅ Server 3000 portunda işləyir');
});