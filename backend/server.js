import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import fileRoute from './routes/fileRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import path from 'path';

dotenv.config();

const app = express();

// Express body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mongo connect
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('Mongo DB Connected!!!'))
   .catch(() => console.log('An error occured!!!!'));

// Api routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/files', fileRoute);
app.use('/api/uploads', uploadRoute);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')));

   app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
   );
} else {
   app.get('/', (req, res) => {
      res.send('API is running...');
   });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
