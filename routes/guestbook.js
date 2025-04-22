const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

router.get('/', async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.render('index', { entries });
});

router.post('/entry', async (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    await Entry.create({ name, message });
  }
  res.redirect('/');
});

module.exports = router;
