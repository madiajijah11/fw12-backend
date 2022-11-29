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
  const sql = `UPDATE movies SET "title" = COALESCE(NULLIF($1,''), "title"), "picture" = COALESCE(NULLIF($2,''), "picture"), "releaseDate" = COALESCE(NULLIF($3,'')::DATE, "releaseDate"), "director" = COALESCE(NULLIF($4,''), "director"), "duration" = COALESCE(NULLIF($5,'')::TIME, "duration"), "synopsis" = COALESCE(NULLIF($6,''), "synopsis") WHERE id = $7 RETURNING *`;
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

exports.upcomingMovies = (data, cb) => {
  console.log(data.month, data.year);
  const sql = `SELECT
    m.id,
    m."picture",
    m."title",
    m."releaseDate",
    string_agg(g."name", ', ')
FROM "movies" m
    JOIN "movieGenre" mG on m.id = mG."movieId"
    JOIN "genres" g on mG."genreId" = g.id
    JOIN "movieSchedules" mS on m.id = mS."movieId"
WHERE to_char(m."releaseDate", 'Month') LIKE $1 AND to_char(m."releaseDate", 'YYYY') LIKE $2
GROUP BY m.id
ORDER BY m."releaseDate" ASC`;
  const values = [`%${data.month}%`, `%${data.year}%`];
  return poolString.query(sql, values, cb);
};

exports.nowShowingMovies = (cb) => {
  const sql = `SELECT
    m.id,
    m."picture",
    m."title",
    mS."startDate",
    ms."endDate",
    string_agg(g."name", ', ')
from "movies" m
    JOIN "movieGenre" mG on m.id = mG."movieId"
    JOIN "genres" g on mG."genreId" = g.id
    JOIN "movieSchedules" mS on m.id = mS."movieId"
WHERE NOW()
BETWEEN mS."startDate"
    AND mS."endDate"
GROUP BY
    m.id,
    mS."startDate",
    ms."endDate"`;
  return poolString.query(sql, cb);
};
