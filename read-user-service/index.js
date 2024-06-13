const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
console.log("mongourl>>>>>>>>>>",process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    interest: {
        type: [String],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', UserSchema);

app.get('/health', async (req, res) => {
  res.send({
    message:"I am ok"
  })
  });

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
  });

app.listen(3001, () => {
  console.log('Create user service listening on port 3001');
});
