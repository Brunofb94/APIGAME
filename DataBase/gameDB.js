const Sequelize = require('sequelize');
const connection = require("./dataBase");


const Games = connection.define('tbgames', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.DATE,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }

})
//Games.sync({force: true}) //force create database 

module.exports = Games;
