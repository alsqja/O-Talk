const express = require('express');
const authRouter = require('./auth');
const chatRouter = require('./chat');
// const userRouter = require("./user");
// const followRouter = require("./follow");
// const likeRouter = require("./like");

const router = express.Router();

router.use('/auth', authRouter);
router.use('/chat', chatRouter);
// router.use("/user", userRouter);
// router.use("/follow", followRouter);
// router.use("/like", likeRouter);

module.exports = router;
