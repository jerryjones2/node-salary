const express = require('express')
const app = express()
var port = process.env.NODEJS_WWW_1V2_SERVICE_PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))