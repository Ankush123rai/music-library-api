const Track = require('../models/track.model');
const Album = require('../models/album.model');
const Artist = require('../models/artist.model');

exports.getAllTracks = async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;
    const query = {};
    if (artist_id) query.artist = artist_id;
    if (album_id) query.album = album_id;
    if (hidden !== undefined) query.hidden = hidden === 'true';

    const tracks = await Track.find(query)
      .populate('artist', 'name')
      .populate('album', 'name')
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const formattedTracks = tracks.map(track => ({
      track_id: track._id,
      artist_name: track.artist.name,
      album_name: track.album.name,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden
    }));

    res.status(200).json({
      status: 200,
      data: formattedTracks,
      message: 'Tracks retrieved successfully.',
      error: null
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message
    });
  }
};

exports.getTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id)
      .populate('artist', 'name')
      .populate('album', 'name');

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        track_id: track._id,
        artist_name: track.artist.name,
        album_name: track.album.name,
        name: track.name,
        duration: track.duration,
        hidden: track.hidden
      },
      message: 'Track retrieved successfully.',
      error: null
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message
    });
  }
};

exports.addTrack = async (req, res) => {
  try {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    const [artist, album] = await Promise.all([
      Artist.findById(artist_id),
      Album.findById(album_id)
    ]);

    if (!artist || !album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist or Album not found.',
        error: null
      });
    }

    await Track.create({
      artist: artist_id,
      album: album_id,
      name,
      duration,
      hidden
    });

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Track created successfully.',
      error: null
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message
    });
  }
};

exports.updateTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message
    });
  }
};

exports.deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Track:${track.name} deleted successfully.`,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message
    });
  }
};