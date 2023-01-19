const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  req.status(201).json({
    status:'success',
    data: {
        user:newUser
    }
  })
};
