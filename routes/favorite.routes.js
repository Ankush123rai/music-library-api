const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/:category', authenticate, favoriteController.getFavorites);
router.post('/add-favorite', authenticate, favoriteController.addFavorite);
router.delete('/remove-favorite/:id', authenticate, favoriteController.removeFavorite);

module.exports = router;