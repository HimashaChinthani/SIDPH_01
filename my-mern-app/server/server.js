const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3004', // or your frontend URL
}));


mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error("Mogodb Connection error:",err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
