var express = require('express');
var router = express.Router();
const articlesCtrl = require('../controllers/articles');

router.delete('/:id/delete', articlesCtrl.remove)
router.get('/', articlesCtrl.index)
router.post('/:id', articlesCtrl.create)
router.get('/new', articlesCtrl.new)
router.get('/:id', articlesCtrl.show)
router.get('/:id/update', articlesCtrl.updateShow)
router.put('/:id/update', articlesCtrl.update)

module.exports = router