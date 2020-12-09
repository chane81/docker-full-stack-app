const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db')

// 서버 생성
const app = express();

// json 해석
app.use(bodyParser.json());

// 테이블 생성하기 
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})

// api 작동 확인
app.get('/api/hi', function (req, res) {
   res.status(200).send('good')
})


// list 조회
app.get('/api/values', (req, res, next) => {
  db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.json(results);
    }
  });
})

// list 에 데이터 INSERT
app.post('/api/value', (req, res, next) => {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.json({ success: true, value: req.body.value });
    }
  });
})

app.listen(5000, () => {
  console.log('node server started! port 5000');
})

