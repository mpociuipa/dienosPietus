const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set the strictQuery option to suppress deprecation warnings
mongoose.set('strictQuery', true);

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/dienos_pietus'; // Use 127.0.0.1 for localhost
mongoose.connect(mongoURI, {
  useNewUrlParser: true,       // Add this to use new URL string parser
  useUnifiedTopology: true     // Add this to use new Server Discovery and Monitoring engine
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
const userRoutes = require('./routes/users');
const dishRoutes = require('./routes/dishes');

app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);

// Start server
const PORT = process.env.PORT || 5001; // Ensure correct port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
