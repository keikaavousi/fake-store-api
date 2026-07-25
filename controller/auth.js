const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { sub: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' },
  );
}

exports.signup = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    const { email, username, password, firstname, lastname } = req.body;
    if (!email || !username || !password || !firstname || !lastname) {
      return res.status(400).json({ message: 'Complete all required fields.' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with those details already exists.' });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      username,
      password,
      name: { firstname, lastname },
    });

    return res.status(201).json({ token: createToken(user), user: user.toJSON() });
  } catch (error) {
    console.error('Signup failed:', error.message);
    return res.status(500).json({ message: 'Unable to create the account.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identity = email || username;

    if (!identity || !password) {
      return res.status(400).json({ message: 'Enter your email and password.' });
    }

    const user = await User.findOne({
      $or: [{ email: identity.toLowerCase() }, { username: identity }],
    }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    return res.json({ token: createToken(user), user: user.toJSON() });
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({ message: 'Unable to sign in.' });
  }
};
