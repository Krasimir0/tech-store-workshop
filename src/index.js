import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/authMiddleware.js';

const app = express();

// Db setup
try {
    // Modofy the name of the DB
    const uri = 'mongodb://localhost:27017/techStore';
    await mongoose.connect(uri);

    console.log('Db Connected Successfuly');
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}
// Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
}));
app.set('view engine', 'hbs');

// Set views directory
app.set('views', './src/views');

// Express Setup 
app.use(express.static('src/public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(auth);
app.use(routes);

// Start server
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));