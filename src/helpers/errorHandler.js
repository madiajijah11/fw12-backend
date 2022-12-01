const errorHandling = (err, res) => {
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Email has already been taken",
    });
  }
  if (err.code === "23503") {
    return res.status(409).json({
      success: false,
      message: "No related data found",
    });
  }
  return res.status(500).json({
    success: false,
    message: err,
  });
};

module.exports = { errorHandling };
