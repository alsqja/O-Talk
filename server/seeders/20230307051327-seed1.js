'use strict';

const { hash } = require('bcrypt');
const {users} = require('../models/index')

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
   await queryInterface.bulkInsert('images', [
    {
      id: 1,
      url: 'https://node-sns-imgs.s3.ap-northeast-2.amazonaws.com/1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-03-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.55.15.png/0',
      toonificated: false,
      user_id: 1,
      createdAt: new Date,
      updatedAt: new Date
    }
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
    await users.update({profile: 1, basic_profile: 1}, {where: {id: 1}})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('images', null, {})
    await queryInterface.bulkDelete('chats', null, {})
  }
};
