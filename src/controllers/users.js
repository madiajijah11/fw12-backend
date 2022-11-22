exports.getUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will show all users in the database.",
  });
};

exports.getUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will show a single user in the database.",
  });
};

exports.createUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will add a user to the database.",
  });
};

exports.updateUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will update a user in the database.",
  });
};

exports.deleteUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will delete a user from the database.",
  });
};
