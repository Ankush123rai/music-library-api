const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.post('/add-user', authenticate, authorize('admin'), userController.addUser);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);
router.put('/update-password', authenticate, userController.updatePassword);

module.exports = router;