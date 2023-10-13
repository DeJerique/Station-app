const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PostModel = require("./models/Post")
const multer = require("multer");
const path = require("path")


dotenv.config();

// Use the DATABASE_URL environment variable from .env
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected To DB'));

app.use(express.static("public/images"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 3000000 } });

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("file upload successful")
    } catch (err) {
        console.log(err);
    }
});



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
    console.log("Server is up n running");
})