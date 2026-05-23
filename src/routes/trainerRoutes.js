const express = require('express');
const trainerController = require('../controllers/trainerController');
const router = express.Router();
router.post('/register',trainerController.register);
router.post('/login',trainerController.login);
router.get('/show',trainerController.show);
module.exports= router;