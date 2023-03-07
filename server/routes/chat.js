const express = require('express');
const controller = require('../controller');
const { verifyToken, verifyChat } = require('./middlewares');

const router = express.Router();

router.post('/', verifyToken, controller.chat.post);
router.get('/:id', controller.chat.detail)
router.put('/:id', verifyToken, verifyChat, controller.chat.put);
router.delete('/:id', verifyToken, verifyChat, controller.chat.delete);

module.exports = router;
