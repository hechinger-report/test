const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
});

app.get('/', (req, res) => {
	console.log(res)
	res.send({hi:'there'})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);

