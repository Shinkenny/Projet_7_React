const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/message');

router.post('/create', auth, multer, messageCtrl.createMessage);
router.get('/getAll', messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.findOneMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router;