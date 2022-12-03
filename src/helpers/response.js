const response = (statusCode, success, message, data, pageInfo, res) => {
  return res.status(statusCode).json({
    success,
    message,
    pageInfo,
    data,
  });
};

module.exports = response;
