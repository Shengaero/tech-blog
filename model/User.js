const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const saltIncomingUserData = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, 10);
};

class User extends Model {
    checkPass(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
            len: [4, 32]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [8]
        }
    }
}, {
    sequelize: sequelize,
    hooks: {
        beforeCreate: async function (newUserData) {
            await saltIncomingUserData(newUserData);
            return newUserData;
        },
        beforeUpdate: async function (updatedUserData) {
            await saltIncomingUserData(updatedUserData);
            return updatedUserData;
        },
        beforeBulkCreate: async function (newUsersData) {
            for(const newUserData of newUsersData) {
                await saltIncomingUserData(newUserData);
            }
            return newUsersData;
        },
        beforeBulkUpdate: async function (updateUsersData) {
            for(const updateUserData of updateUsersData) {
                await saltIncomingUserData(updatedUserData);
            }
            return updateUsersData;
        }
    },
    timestamps: false,
    underscored: true,
    modelName: 'user',
    tableName: 'users_table',
    defaultScope: {
        attributes: {
            exclude: ['password'] // password column excluded by default
        }
    }
});

module.exports = User;
