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

app.post('/users', async (req, res) => {
    const { user, interest, age, mobile, email } = req.body;

    const data = {
        user,
        interest,
        age,
        mobile,
        email,
    };
    const userCreate = await User.create(data);
   res.send(user);
  res.status(201).json(userCreate);
});

app.listen(3000, () => {
  console.log('Create user service listening on port 3000');
});
