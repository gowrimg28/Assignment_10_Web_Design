const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/Routes/router');
const cors = require('cors');
const userRoutes = require('./api/Routes/userRoutes');
const imageRoutes = require('./api/Routes/imageRoutes');
const jobRoutes = require('./api/Routes/jobRoutes');

console.log(typeof imageRoutes);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes); 
app.use('/api/images', imageRoutes);
app.use('/api', jobRoutes);
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/assignment9', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use the routes defined in the router module
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
