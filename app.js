const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const guestbookRoutes = require('./routes/guestbook');
require('dotenv').config();

const app = express();

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/guestbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.error('MongoDB 연결 실패:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', guestbookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
