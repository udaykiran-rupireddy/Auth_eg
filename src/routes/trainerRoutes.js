const express = require('express');
const trainerController = require('../controllers/trainerController')
const router = express.Router();
router.post('/register',trainerController.register);
router.post('/login',trainerController.login);
router.post('/work',trainerController.work);
router.get('/show',trainerController.show);
router.delete('/work', trainerController.delete);
module.exports= router;