const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

app.use(express.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.render('index', { top10: [1, 2, 3] });
  axios.get('https://api.wazirx.com/api/v2/tickers')
    .then(function (response) {
      let names = Object.keys(response.data).slice(0, 10)
      let top10 = []
      for (let i = 0; i < 10; i++) {
        top10.push(response.data[names[i]])
      }

      console.log(top10.length);
      res.render('index', { top10: top10 });
      // res.json(top10).end();
      // res.sendFile(__dirname + '/index.html')
    })
})

app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})