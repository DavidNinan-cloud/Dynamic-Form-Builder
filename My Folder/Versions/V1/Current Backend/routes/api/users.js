const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const usersDetailController = require('../../controllers/userDetailController');
const usersTransactionsController = require('../../controllers/userFundTransactionsController');


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);
    
    
router.route('/detail')
    .put(usersDetailController.updateUserDetails)
    .get(usersDetailController.getUserDetailsById);

router.route('/detail/investments')
    .put(usersDetailController.updateUserInvestmentDetails);

// router.route('/detail/:id')
//     .get(usersDetailController.getUserDetailsById);

router.route('/transactions')
    .post(usersTransactionsController.createNewUserTransaction)
    .put(usersTransactionsController.updateUserTransaction)
    .delete(usersTransactionsController.deleteUserTransaction);

router.route('/transactions/:id')
    .get(usersTransactionsController.getUserTransactionById)
//     ,
// ,
// ,
// 
module.exports = router;