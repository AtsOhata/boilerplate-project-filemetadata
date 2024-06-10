const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'ファイルが送信されていません' });
    }
    const fileInfo = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    };
    res.send(fileInfo);
});

mongoose.connect("mongodb+srv://dbuser2:uuuth@cluster0.uk2xzib.mongodb.net/task5?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
