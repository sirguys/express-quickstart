var express = require('express')
var app = express()
app.listen(3000)
var mongo = require('mongodb')
app.get('/start', function(req, res) {
  res.send(`
    <form action='/zip'>
      <input name='city'>
      <button type='submit'>Search</button>
    </form>
  `)
})
app.get('/zip', showZip)
function showZip(req, res) {
  mongo.MongoClient.connect('mongodb://127.0.0.1/zip', (error, db) => {
    db.collection('zip').find({city:req.query.city}).toArray( (error, data) => {
      res.send(data)
    })
  })
}
