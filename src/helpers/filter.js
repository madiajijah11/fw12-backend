const { duplicateKey } = require("./errorHandler");

const filter = (data, sortables, pageInfoModel, res, cb) => {
  data.page = parseInt(data.page) || 1;
  data.limit = parseInt(data.limit) || 5;
  data.search = data.search || "";
  data.sortBy = (sortables.includes(data.sortBy) && data.sortBy) || "createdAt";
  data.sort = data.sort || "ASC";
  data.month = data.month || "";
  data.year = data.year || "";

  const params = {
    limit: data.limit,
    offset: (parseInt(data.page) - 1) * data.limit,
    search: data.search,
    sortBy: data.sortBy,
    sort: data.sort,
    month: data.month,
    year: data.year,
  };

  const pageInfo = {
    page: data.page,
    totalData: 0,
  };

  pageInfoModel(params, (err, result) => {
    console.log(result);
    console.log(err);
    if (err) {
      return duplicateKey(err, res);
    }
    if (result.length) {
      pageInfo.totalData = parseInt(result.rows[0].totalData);
      pageInfo.totalPage = Math.ceil(result.rows[0].totalData / data.limit);
      pageInfo.nextPage =
        data.page < pageInfo.totalPage ? pageInfo.page + 1 : null;
      pageInfo.prevPage = pageInfo.page > 1 ? data.page - 1 : null;
      return cb(params, pageInfo);
    } else {
      return res.status(200).json({
        success: true,
        message: "Data not found",
        pageInfo,
        data: [],
      });
    }
  });
};

module.exports = filter;
