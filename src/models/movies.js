const { poolString } = require("../helpers");

exports.getMovies = (cb) => {
  const sql = "SELECT * FROM movies";
  return poolString.query(sql, cb);
};

exports.getMovie = (data, cb) => {
  const sql = "SELECT * FROM movies WHERE id = $1";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};

exports.createMovie = (data, cb) => {
  const sql =
    'INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const { title, picture, releaseDate, director, duration, synopsis } =
    data.body;
  const values = [title, picture, releaseDate, director, duration, synopsis];
  return poolString.query(sql, values, cb);
};

exports.updateMovie = (data, cb) => {
  const sql =
    'UPDATE movies SET "title" = $1, "picture" = $2, "releaseDate" = $3, "director" = $4, "duration" = $5, "synopsis" = $6, "updatedAt" = $7 WHERE id = $8 RETURNING *';
  const { id } = data.params;
  const { title, picture, releaseDate, director, duration, synopsis } =
    data.body;
  const values = [
    title,
    picture,
    releaseDate,
    director,
    duration,
    synopsis,
    new Date(),
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteMovie = (data, cb) => {
  const sql = "DELETE FROM movies WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
