const router = require('express').Router();
const structoPageController = require('../controller/structo.controller');


router.route('/about')
.get(structoPageController.about)

router.route('/salt')
.post(structoPageController.salt)

router.route('/token_exp')
.post(structoPageController.token_exp)

module.exports = router;