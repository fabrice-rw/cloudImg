require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./routes/swaggerConfig');
const bodyParser = require('body-parser');

const routes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to Database ✅');
    })
    .catch((error) => {
        console.error('❌ Failed to connect to Database', error);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', routes);
app.use('/', authRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
