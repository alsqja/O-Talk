'use strict';

const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

async function hashPass(password) {
  const result = await hash(password, 12)
  return result
}

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [
    {
      id: 1,
      name: 'test',
      password: await hashPass('asd'),
      profile: null,
      basic_profile: null,
      online: false,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      id: 2,
      name: 'asd',
      password: await hashPass('123'),
      profile: null,
      basic_profile: null,
      online: false,
      createdAt: new Date,
      updatedAt: new Date
    },
   ], {})
   await queryInterface.bulkInsert('chats', [
    {
      id: 1,
      title: 'test',
      contents: 'test',
      user_id: 1,
      isPrivate: false,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      id: 2,
      title: 'test2',
      contents: 'test2',
      user_id: 2,
      isPrivate: false,
      createdAt: new Date,
      updatedAt: new Date
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('chats', null, {})
  }
};
