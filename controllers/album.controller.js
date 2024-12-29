const Album = require('../models/album.model');
const Artist = require('../models/artist.model');

exports.getAllAlbums = async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, hidden } = req.query;
    const query = {};
    if (artist_id) query.artist = artist_id;
    if (hidden !== undefined) query.hidden = hidden === 'true';

    const albums = await Album.find(query)
      .populate('artist', 'name')
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const formattedAlbums = albums.map(album => ({
      album_id: album._id,
      artist_name: album.artist.name,
      name: album.name,
      year: album.year,
      hidden: album.hidden
    }));

    res.status(200).json({
      status: 200,
      data: formattedAlbums,
      message: 'Albums retrieved successfully.',
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

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name');
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        album_id: album._id,
        artist_name: album.artist.name,
        name: album.name,
        year: album.year,
        hidden: album.hidden
      },
      message: 'Album retrieved successfully.',
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

exports.addAlbum = async (req, res) => {
  try {
    const { artist_id, name, year, hidden } = req.body;

    const artist = await Artist.findById(artist_id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null
      });
    }

    await Album.create({ artist: artist_id, name, year, hidden });

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Album created successfully.',
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

exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found.',
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

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Album:${album.name} deleted successfully.`,
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