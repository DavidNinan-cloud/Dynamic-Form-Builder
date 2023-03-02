const express = require('express');
const router = express.Router();
const allController = require('../../controllers/AllControllers');

router.route('/getAllUsers')
    .get(allController.getAllUsers);

router.route('/getUserDetailsById')
    .get(allController.getUserDetailsById);

router.route('/createNewUser')
    .post(allController.createNewUser);

router.route('/updateUser')
    .put(allController.updateUser);

router.route('/deleteUser')
    .delete(allController.deleteUser);

router.route('/getNAVHistroy')
    .get(allController.getNAVHistroy);

router.route('/addNAV')
    .post(allController.addNAV);

router.route('/getFundDetails')
    .get(allController.getFundDetails);

router.route('/getFundNAV')
    .get(allController.getFundNAV);

router.route('/getUserTransactionById')
    .get(allController.getUserTransactionById);
    
router.route('/createNewUserTransaction')
    .post(allController.createNewUserTransaction);

router.route('/deleteUserTransaction')
    .delete(allController.deleteUserTransaction);

router.route('/updateUserTransaction')
    .put(allController.updateUserTransaction);
    
module.exports = router;