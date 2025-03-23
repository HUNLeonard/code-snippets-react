import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://hunleonard.github.io',  
  'http://localhost:5173',        
  'http://localhost:4173'          
];



app.use(cors({
  origin: function(origin, callback) {

    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  ownerId: { type: String, required: true }
});

const codeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  desc: { type: String, default: '' },
  categories: [{ type: String, ref: 'Category' }],
  ownerId: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);
const Code = mongoose.model('Code', codeSchema);

// Category Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, image, ownerId } = req.body;
    const category = new Category({ name, image, ownerId });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      { name, image },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Code Routes
app.get('/api/codes', async (req, res) => {
  try {
    const codes = await Code.find();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/codes', async (req, res) => {
  try {
    const { name, code, desc, categories, ownerId } = req.body;
    const newCode = new Code({ name, code, desc, categories, ownerId });
    const savedCode = await newCode.save();
    res.status(201).json(savedCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/codes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, desc, categories } = req.body;
    const updatedCode = await Code.findByIdAndUpdate(
      id,
      { name, code, desc, categories },
      { new: true }
    );
    res.json(updatedCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/codes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Code.findByIdAndDelete(id);
    res.json({ message: 'Code deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  mongoose.connection.close();
  process.exit(0);
}