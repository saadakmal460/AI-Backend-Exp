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

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKKEN);

    // Prepare the user data without password
    const { password: pass, ...rest } = validUser._doc;

    // Set cookie
    res.cookie('access_token', token, {
      httpOnly: true, // Prevent access to cookie from JavaScript
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
      sameSite: 'strict', // 'lax' or 'strict' based on your requirements
      maxAge: 3600000, // Optional: set cookie expiration time (1 hour)
    });

    // Send the response separately after cookie has been set
    return res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};




module.exports = {
    signup,signin
}