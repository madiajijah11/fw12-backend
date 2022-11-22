exports.getMovies = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will show all movies in the database.",
  });
};

exports.getMovie = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will show a single movie in the database.",
  });
};

exports.createMovie = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will add a movie to the database.",
  });
};

exports.updateMovie = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will update a movie in the database.",
  });
};

exports.deleteMovie = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "This route will delete a movie from the database.",
  });
};
