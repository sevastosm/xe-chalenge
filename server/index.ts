import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import autocompleteRoutes from './routes/autocomplete';
import mongoose from 'mongoose';
import adsRoutes from './routes/ads';
const uri = "mongodb+srv://sevastosmatzouranis:1q2w3e4r@cluster0.vcpbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(uri as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', autocompleteRoutes);
app.use('/api', adsRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 