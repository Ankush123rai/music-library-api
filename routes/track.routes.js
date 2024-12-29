const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', authenticate, trackController.getAllTracks);
router.get('/:id', authenticate, trackController.getTrack);
router.post('/add-track', authenticate, authorize('admin', 'editor'), trackController.addTrack);
router.put('/:id', authenticate, authorize('admin', 'editor'), trackController.updateTrack);
router.delete('/:id', authenticate, authorize('admin', 'editor'), trackController.deleteTrack);

module.exports = router;