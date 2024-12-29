const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', authenticate, artistController.getAllArtists);
router.get('/:id', authenticate, artistController.getArtist);
router.post('/add-artist', authenticate, authorize('admin', 'editor'), artistController.addArtist);
router.put('/:id', authenticate, authorize('admin', 'editor'), artistController.updateArtist);
router.delete('/:id', authenticate, authorize('admin', 'editor'), artistController.deleteArtist);

module.exports = router;