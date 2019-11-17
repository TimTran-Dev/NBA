const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db, collection;

const url = "mongodb+srv://NBA:demo@cluster0-7fqm0.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "NBA";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('Thread').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {talk: result})
  })
})

app.post('/talk', (req, res) => {
  db.collection('Thread').save({team: req.body.team, like: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})



app.post('/talk2', (req, res) => {
  db.collection('Thread').save({team: req.body.team, dislike: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})



app.put('/talk', (req, res) => {
  db.collection('Thread')
  .findOneAndUpdate({team: req.body.team}, {
    $set: {
      like:req.body.like + 1,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



app.put('/talk2', (req, res) => {
  db.collection('Thread')
  .findOneAndUpdate({team: req.body.team}, {
    $set: {
      dislike:req.body.dislike + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})




app.delete('/talk', (req, res) => {
  console.table(req.body);
  db.collection('Thread').findOneAndDelete({team: req.body.team}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
