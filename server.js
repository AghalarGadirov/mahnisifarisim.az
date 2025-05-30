const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/formlar', (req, res) => {
  const data = fs.readFileSync('formlar.json');
  res.json(JSON.parse(data));
});

app.post('/api/formlar', (req, res) => {
  const data = {
    phone: req.body.phone || "994507142403",
    forms: req.body.forms || []
  };
  fs.writeFileSync('formlar.json', JSON.stringify(data, null, 2));
  res.json({ status: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});