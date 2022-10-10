const sequelize = require("../config/connection");
const userSeeds = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

async function seed() {
    await sequelize.sync({ force: true });

    const users = await userSeeds();
    const posts = await postSeeds();
    const comments = await commentSeeds();

    console.log(JSON.stringify(users, null, 2));
    console.log(JSON.stringify(posts, null, 2));
    console.log(JSON.stringify(comments, null, 2));

    await sequelize.close();
}

seed();
