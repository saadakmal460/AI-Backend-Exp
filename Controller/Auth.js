const User = require('../Models/UserModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    
    const token = jwt.sign({ id: validUser._id }, 'your_jwt_secret'); // You can hardcode the secret for now
    
    const { password: pass, ...rest } = validUser._doc;

    // Manual check for secure flag
    const isProduction = true; // Manually set this to true or false based on your environment
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: isProduction, // Will only be secure in production
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};




module.exports = {
    signup,signin
}