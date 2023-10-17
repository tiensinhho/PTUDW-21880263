'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const models = require('../models');
        const bcrypt = require('bcrypt');
        
        //update has password
        let users = await models.User.findAll();
        let updatedUsers = [];
        users.forEach(item => {
            updatedUsers.push({
                id: item.id,
                password: bcrypt.hashSync("Demo@123",8)
            });
        })
        await models.User.bulkCreate(updatedUsers, {
            updateOnDuplicate: ['password']
        });
    },

    async down(queryInterface, Sequelize) {

    }
};


//sequelize db:seed --seed 9-Star.js