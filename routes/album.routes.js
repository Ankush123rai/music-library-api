const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', authenticate, albumController.getAllAlbums);
router.get('/:id', authenticate, albumController.getAlbum);
router.post('/add-album', authenticate, authorize('admin', 'editor'), albumController.addAlbum);
router.put('/:id', authenticate, authorize('admin', 'editor'), albumController.updateAlbum);
router.delete('/:id', authenticate, authorize('admin', 'editor'), albumController.deleteAlbum);

module.exports = router;