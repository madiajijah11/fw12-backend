const duplicateKey = (err, res) => {
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

const emptyRows = (res, result, pageInfo) => {
  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No data found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Success",
    pageInfo,
    data: result?.rows,
  });
};

module.exports = { duplicateKey, emptyRows };
