const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users.controller');
const passport = require('passport');
require('../config/passport')(passport);


router.post('/register', userController.create);
router.post('/authenticate',userController.authenticate);
router.get('/wall', passport.authenticate('jwt', { session: false}),userController.accessWall);

module.exports = router;