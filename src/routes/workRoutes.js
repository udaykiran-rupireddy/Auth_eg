const express = require('express');
const workController = require('../controllers/workController');
const router = express.Router();
router.post('/add',workController.work);
router.delete('/remove', workController.delete);
router.get('/print',workController.print);
//router.put('/update',workController.update);
module.exports= router;