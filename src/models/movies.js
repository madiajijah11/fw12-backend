const { poolString } = require("../helpers");

exports.pageInfo = (filter, cb) => {
  const sql = `SELECT COUNT("title") AS "totalData" FROM "movies" WHERE title LIKE $1`;
  const values = [`%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getMovies = (filter, cb) => {
  const sql = `SELECT * FROM movies WHERE title LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getMovie = (id, cb) => {
  const sql = "SELECT * FROM movies WHERE id = $1";
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createMovie = (data, cb) => {
  const sql =
    'INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [
    data.title,
    data.picture,
    data.releaseDate,
    data.director,
    data.duration,
    data.synopsis,
  ];
  return poolString.query(sql, values, cb);
};

exports.updateMovie = (id, data, cb) => {
  const sql = `UPDATE movies SET "title" = COALESCE($1, "title"), "picture" = COALESCE($2, "picture"), "releaseDate" = COALESCE($3, "releaseDate")::date, "director" = COALESCE($4, "director"), "duration" = COALESCE($5, "duration")::time, "synopsis" = COALESCE($6, "synopsis") WHERE id = $7 RETURNING *`;
  const values = [
    data.title,
    data.picture,
    data.releaseDate,
    data.director,
    data.duration,
    data.synopsis,
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteMovie = (id, cb) => {
  const sql = "DELETE FROM movies WHERE id = $1 RETURNING *";
  const values = [id];
  return poolString.query(sql, values, cb);
};
