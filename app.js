const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const Image = require("./models/image");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
// const MONGODB_URI='mongodb+srv://abdelrhman:01210901232@cluster0.g5ppb.mongodb.net/messages?retryWrites=true&w=majority';

const MONGODB_URI =
  "mongodb+srv://roaa:B2OwcHtSyUojMla0@cluster0.aszcs.mongodb.net/messages?retryWrites=true&w=majority";
// const MONGODB_URI = 'mongodb+srv://mongz2020:masr2020@cluster0.kljj7.mongodb.net/mongzDB?retryWrites=true&w=majority'

const PORT = process.env.port || 8080;

const app = express();
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: 'images',
//   filename: (req, file, cb) => {
//       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );

    //cb(null, new Date().toISOString() + '-' + file.originalname );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

// app.use('/profile', express.static('images'));
// app.post("/upload", upload.single('profile'), async(req, res) => {
//   //const imageUrl = req.file.buffer;
//   const image =new Image({
//     image: `http://localhost:8080/profile/${req.file.filename}`
//   });
//   await image.save();
//   res.json({
//       success: 1,
//       profile_url: `http://localhost:8080/profile/${req.file.filename}`
//   })
// })
//multer options
// const upload = multer({
//   dest: 'images',
//   limits: {
//   fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//   if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
//   cb(new Error('Please upload an image.'))
//   }
//   cb(undefined, true)
//   }
//   });

// router.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
//   }, (error, req, res, next) => {
//   res.status(400).send({error: error.message})
//   });

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

// Error heandling function
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const server = app.listen(PORT);
    // const io = require('./socket').init(server);

    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });
  })
  .catch((err) => {
    console.log(err);
  });
