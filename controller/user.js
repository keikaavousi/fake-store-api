const User = require('../model/user');

exports.getAllUser = async (req, res) => {
  try {
    const limit = Math.max(0, Number(req.query.limit) || 0);
    const sort = req.query.sort === 'desc' ? -1 : 1;
    return res.json(await User.find().limit(limit).sort({ _id: sort }));
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load users.' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      name: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
      address: req.body.address,
      phone: req.body.phone,
    });
    return res.status(201).json(user);
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;
    return res.status(status).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  const safeUpdates = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  };
  Object.keys(safeUpdates).forEach((key) => {
    if (safeUpdates[key] === undefined) delete safeUpdates[key];
  });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, safeUpdates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }
};
