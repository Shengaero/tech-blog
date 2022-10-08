require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers')

// app setup
const app = express();
const PORT =
    process.env.EXPRESS_PORT ||
    process.env.PORT ||
    3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

async function start() {
    // synchronize DB
    await sequelize.sync({
        force: new Boolean(process.env.DB_SYNC || 'false')
    });
    // open server  
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

// run start
start();
