// required packages to start the server

// package for middleman server
const express = require('express');

// middleware that parses incoming requests before handling
// available under req.body property (subsitute for mongoSchemas)
// const bodyParser = require('body-parser')

// cross origin resource sharing
// used to tell browsers to give a web application running
// one origin (domain/host/port) access to seleted resources
// from a different origin
const cors = require('cors');
const mongoose = require('mongoose');

// file upload variables
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');

// enviornment files in ".env" file
require('dotenv').config();

// create express server
const app = express();
const port = process.env.PORT || 5000;

// express middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// Start connection to mongoose database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Init gfs
let gfs;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully " + `to ${connection.db.databaseName}`)
    
    // Init GridFs Stream
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "uploads"
    });

})

mongoose.connection.on('error', err => {
    console.error('connection error:', err)
})

// Create storage engine 
const storage = new GridFsStorage({
  url: process.env.ATLAS_URI,
  useUnifiedTopology: true,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// Post /upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file});
});

// Sends Array of files
app.get('/files', (req, res) => {
  // find the files
  gfs.find().toArray((err, files) => {
    // check to see if any exist at all
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist.'
      });
    }
    return res.json(files);
  });
});

// Sends a file
app.get('/files/:filename', (req, res) => {
  // find the file
  gfs.find({ filename: req.params.filename})
    .toArray((err, files) => {
    // check to see if any exist at all
      if(!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist.'
        });
      }
      return res.json(files);
    });
});

// Get image/:filename
app.get('/image/:filename', (req, res) => {
  // find the file
  gfs.find({ filename: req.params.filename})
    .toArray((err, files) => {
      // check to see if any exist at all
      if(!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist.'
        });
      }

      // check if file is image
      if(files[0].contentType === 'image/jpeg' ||
      files[0].contentType === 'image/png'     ||
      files[0].contentType === 'image/svg+xml' ||
      files[0].contentType === 'image/gif') {
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        res.status(404).json({err: 'Not an image'})
      }

    });
});

// delete a file
app.post('/file/del/:id', (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id)),
  (err, data) => {
    if (err) {
      return res.status(404).json({ err: err});
    }

    res.status(200).json({
      message: `File with ID ${req.params.id} is deleted.`
    })
  }
});


/* add startup functions here
*
*/

const contentRouter = require('./routes/content');
//const swaggerStuff = require('./routes/doc')

app.use('/content', contentRouter);
//app.use('/docs', swaggerStuff);

// start listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

