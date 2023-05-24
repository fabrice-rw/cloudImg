import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fileRoutes from './routes/fileRoutes';
import swaggerDocs from './docs/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.DB_URL;

if (!mongodbUri) {
    throw new Error('MongoDB URI is not defined in the .env file.');
}

app.use(express.json());
app.use('/', fileRoutes);

// Establish connection to MongoDB
mongoose
    .connect(mongodbUri)
    .then(() => {
        console.log('Connected to MongoDB 😊');

        // Start the server
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
            swaggerDocs(app);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
