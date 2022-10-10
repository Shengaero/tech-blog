require('dotenv').config();
const path = require('path');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers');

// app setup
const app = express();
const PORT = process.env.EXPRESS_PORT || process.env.PORT || 3001;

// session setup
async function setupSession() {
    const secret = process.env.SESS_SECRET;
    if(!secret)
        throw new Error('No "SESS_SECRET" environment variable found! Make sure to set this via the .env file!');

    let salt = process.env.SESS_SALT;
    if(!salt) {
        console.log('WARNING: No SESS_SALT environment variable found! A new one will be generated using bcrypt...');
        salt = await bcrypt.genSalt(5);
        console.log(`Salt: ${salt}`);
        console.log("            ^ It's recommend you store this salt value in your .env file as SESS_SALT!");
    }

    app.use(session({
        secret: await bcrypt.hash(secret, salt),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize,
        })
    }));
}

// middleware setup
function setupMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
}

// handlebars setup
function setupHandlebars() {
    const hbs = exphbs.create({});
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
}

// routes setup
function setupRoutes() {
    app.use(routes);
}

// database setup
async function setupSequelize() {
    await sequelize.sync({ force: false });
}

async function start() {
    await setupSession();
    setupMiddleware();
    setupHandlebars();
    setupRoutes();
    await setupSequelize();

    // open server
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

// run start
start();
