const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  try {
    const { limit = 5, offset = 0, role } = req.query;
    const query = role ? { role } : {};

    const users = await User.find(query)
      .select('-password')
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    res.status(200).json({
      status: 200,
      data: users,
      message: 'Users retrieved successfully.',
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

exports.addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === 'admin') {
      return res.status(403).json({
        status: 403,
        data: null,
        message: 'Cannot create admin users',
        error: null
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: 'Email already exists.',
        error: null
      });
    }

    await User.create({ email, password, role });

    res.status(201).json({
      status: 201,
      data: null,
      message: 'User created successfully.',
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null
      });
    }

    if (user.role === 'admin') {
      return res.status(403).json({
        status: 403,
        data: null,
        message: 'Cannot delete admin users',
        error: null
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 200,
      data: null,
      message: 'User deleted successfully.',
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

exports.updatePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(old_password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid old password',
        error: null
      });
    }

    user.password = new_password;
    await user.save();

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