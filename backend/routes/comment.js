const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.post('/create', auth, commentCtrl.createComment);
router.get('/getAll', commentCtrl.findAllComments);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;