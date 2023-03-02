const express = require('express');
const router = express.Router();
const fundNAvController = require('../../controllers/fundNAVController');
const fundDetailsController = require('../../controllers/fundDetailsController');

router.route('/')
    .get(fundDetailsController.getFundDetails);

router.route('/details')
    .put(fundDetailsController.editFundDetails);

router.route('/other_details')
    .put(fundDetailsController.editFund_QTY_AUM);

router.route('/nav_details')
    .put(fundDetailsController.editFund_nav);

router.route('/nav')
    .get(fundNAvController.getNAVHistroy)
    .post(fundNAvController.addNAV);



module.exports = router;