var express = require('express');
var router = express.Router();
var items_controller = require('../../controllers/web/items.controller');

router.get('/all', items_controller.all);
router.post('/update', items_controller.update);

module.exports = router;