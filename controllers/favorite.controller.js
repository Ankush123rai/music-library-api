const Favorite = require('../models/favorite.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const Track = require('../models/track.model');

exports.getFavorites = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 5, offset = 0 } = req.query;

    const favorites = await Favorite.find({
      user: req.user._id,
      category
    })
      .populate('item')
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const formattedFavorites = favorites.map(fav => ({
      favorite_id: fav._id,
      category: fav.category,
      item_id: fav.item._id,
      name: fav.item.name,
      created_at: fav.createdAt
    }));

    res.status(200).json({
      status: 200,
      data: formattedFavorites,
      message: 'Favorites retrieved successfully.',
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

exports.addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;

    let item;
    switch (category) {
      case 'artist':
        item = await Artist.findById(item_id);
        break;
      case 'album':
        item = await Album.findById(item_id);
        break;
      case 'track':
        item = await Track.findById(item_id);
        break;
    }

    if (!item) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Item not found.',
        error: null
      });
    }

    await Favorite.create({
      user: req.user._id,
      category,
      item: item_id
    });

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Favorite added successfully.',
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

exports.removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Favorite not found.',
        error: null
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Favorite removed successfully.',
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