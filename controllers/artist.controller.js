const Artist = require('../models/artist.model');

exports.getAllArtists = async (req, res) => {
  try {
    const { limit = 5, offset = 0, grammy, hidden } = req.query;
    const query = {};
    if (grammy !== undefined) query.grammy = grammy;
    if (hidden !== undefined) query.hidden = hidden === 'true';

    const artists = await Artist.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    res.status(200).json({
      status: 200,
      data: artists,
      message: 'Artists retrieved successfully.',
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

exports.getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: 'Artist retrieved successfully.',
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

exports.addArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;
    await Artist.create({ name, grammy, hidden });

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Artist created successfully.',
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

exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
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

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: { artist_id: artist._id },
      message: `Artist:${artist.name} deleted successfully.`,
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