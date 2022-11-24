const duplicateKey = (err, res) => {
  if (err.message.includes("duplicate key value violates unique constraint")) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }
  return res.status(500).json({
    success: false,
    message: err,
  });
};

const emptyRows = (res, result) => {
  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: result?.rows,
  });
};

module.exports = { duplicateKey, emptyRows };
