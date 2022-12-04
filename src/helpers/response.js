const response = (statusCode, success, message, pageInfo, data, res) => {
  return res.status(statusCode).json({
    success,
    message,
    pageInfo,
    data,
  });
};

module.exports = response;
