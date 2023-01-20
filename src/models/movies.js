const { poolString } = require('../helpers/db')

exports.countAllMovies = async (filter, cb) => {
  try {
    const sql = 'SELECT COUNT("title") AS "totalData" FROM "movies" WHERE title LIKE $1'
    const values = [`%${filter.search}%`]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.getMovies = async (filter, cb) => {
  try {
    const sql = `SELECT
    m.id,
    m."title",
    m."picture",
    string_agg(DISTINCT g.name, ', ') as "genre",
    m."duration",
    m."director",
    string_agg(DISTINCT c.name, ', ') as "cast",
    m."synopsis",
    m."releaseDate",
    m."createdAt",
    m."updatedAt"
    FROM movies m
    JOIN "movieGenre" mG ON m.id = mG."movieId"
    JOIN "genres" g ON mG."genreId" = g.id
    JOIN "movieCast" mC ON m.id = mC."movieId"
    JOIN "casts" c ON mC."castId" = c.id
    WHERE m."title" LIKE $3
    GROUP BY m.id, m."title", m."picture", m."duration", m."director", m."synopsis", m."releaseDate", m."createdAt", m."updatedAt"
    ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`
    const values = [filter.limit, filter.offset, `%${filter.search}%`]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.getMovie = async (id, cb) => {
  try {
    const sql = `
    SELECT m."id", m."title", m."picture",
    string_agg(DISTINCT g."name", ', ') as "genre",
    m."duration", m."director",
    string_agg(DISTINCT c."name", ', ') as "cast",
    m."synopsis", m."releaseDate", m."createdAt", m."updatedAt"
    FROM "movies" m
    JOIN "movieGenre" mG ON m."id" = mG."movieId"
    JOIN "genres" g ON mG."genreId" = g."id"
    JOIN "movieCast" mC ON m."id" = mC."movieId"
    JOIN "casts" c ON mC."castId" = c."id"
    WHERE m."id" = $1
    GROUP BY m."id", m."title", m."picture", m."duration", m."director", m."synopsis", m."releaseDate", m."createdAt", m."updatedAt"`
    const values = [id]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.createMovie = async (data, cb) => {
  try {
    const sql =
      'INSERT INTO movies ("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [
      data.title,
      data.picture,
      data.releaseDate,
      data.director,
      data.duration,
      data.synopsis
    ]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.updateMovie = async (id, data, cb) => {
  try {
    const sql =
      'UPDATE movies SET "title" = COALESCE(NULLIF($1,\'\'), "title"), "picture" = COALESCE(NULLIF($2,\'\'), "picture"), "releaseDate" = COALESCE(NULLIF($3,\'\')::DATE, "releaseDate"), "director" = COALESCE(NULLIF($4,\'\'), "director"), "duration" = COALESCE(NULLIF($5,\'\')::TIME, "duration"), "synopsis" = COALESCE(NULLIF($6,\'\'), "synopsis") WHERE id = $7 RETURNING *'
    const values = [
      data.title,
      data.picture,
      data.releaseDate,
      data.director,
      data.duration,
      data.synopsis,
      id
    ]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.deleteMovie = async (id, cb) => {
  try {
    const sql = 'DELETE FROM movies WHERE id = $1 RETURNING *'
    const values = [id]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.upComingMovies = async (data, cb) => {
  try {
    const sql = `SELECT
    m."id",
    m."title",
    m."picture",
    string_agg(DISTINCT g."name", ', ') as "genre",
    m."duration",
    m."director",
    string_agg(DISTINCT c."name", ', ') as "cast",
    m."synopsis",
    m."releaseDate",
    m."createdAt",
    m."updatedAt"
    FROM movies m
    JOIN "movieGenre" mG ON m."id" = mG."movieId"
    JOIN "genres" g ON mG."genreId" = g."id"
    JOIN "movieCast" mC ON m."id" = mC."movieId"
    JOIN "casts" c ON mC."castId" = c."id"
    WHERE m."title" LIKE $5 AND
    date_part('year', m."releaseDate")::VARCHAR = COALESCE(NULLIF($2,''), date_part('year', CURRENT_DATE)::VARCHAR)
    AND
    date_part('month', m."releaseDate")::VARCHAR = COALESCE(NULLIF($1,''), date_part('month', CURRENT_DATE)::VARCHAR)
    GROUP BY m."id", m."title", m."picture", m."releaseDate", m."duration", m."director", m."synopsis", m."createdAt", m."updatedAt"
    ORDER BY "${data.sortBy}" ${data.sort}
    LIMIT $3 OFFSET $4`
    const values = [data.month, data.year, data.limit, data.offset, `%${data.search}%`]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.countAllUpcomingMovies = async (filter, cb) => {
  try {
    const sql =
      "SELECT COUNT(\"title\") AS \"totalData\" FROM \"movies\" WHERE title LIKE $1 AND date_part('year', \"releaseDate\")::VARCHAR = COALESCE(NULLIF($3,''), date_part('year', CURRENT_DATE)::VARCHAR) AND date_part('month', \"releaseDate\")::VARCHAR = COALESCE(NULLIF($2,''), date_part('month', CURRENT_DATE)::VARCHAR)"
    const values = [`%${filter.search}%`, filter.month, filter.year]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.nowShowingMovies = async (data, cb) => {
  try {
    const sql = `SELECT
    m."id",
    m."title",
    m."picture",
    string_agg(DISTINCT g."name", ', ') as "genre",
    m."duration",
    m."director",
    string_agg(DISTINCT c."name", ', ') as "cast",
    m."synopsis",
    m."releaseDate",
    mS."startDate",
    ms."endDate",
    ms."createdAt",
    ms."updatedAt"
    from "movies" m
    JOIN "movieGenre" mG ON m."id" = mG."movieId"
    JOIN "genres" g ON mG."genreId" = g."id"
    JOIN "movieCast" mC ON m."id" = mC."movieId"
    JOIN "casts" c ON mC."castId" = c."id"
    JOIN "movieSchedules" mS on m."id" = mS."movieId"
    WHERE CURRENT_DATE BETWEEN
    mS."startDate"
    AND
    mS."endDate"
    GROUP BY
    m."id",
    m."title",
    m."picture",
    m."releaseDate",
    m."duration",
    m."director",
    m."synopsis",
    mS."startDate",
    ms."endDate",
    ms."createdAt",
    ms."updatedAt"
    ORDER BY "${data.sortBy}" ${data.sort}
    LIMIT $1 OFFSET $2`
    const values = [data.limit, data.offset]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.countAllNowShowingMovies = async (filter, cb) => {
  try {
    const sql = `SELECT COUNT("title") AS "totalData" FROM "movies" m
  JOIN "movieSchedules" mS on m.id = mS."movieId"
  WHERE CURRENT_DATE BETWEEN mS."startDate" AND mS."endDate"`
    const result = await poolString.query(sql)
    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

exports.getScheduleByMovieId = async (id, city, date, cb) => {
  console.log(id, city, date)
  try {
    const sql = `
    SELECT c.id, c.picture, c.name, c.address, c.city, mS.price,
    string_to_array(string_agg(DISTINCT mST.time::VARCHAR, ', ' ), ', ') as time
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m on mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST on mS.id = mST."movieScheduleId"
    WHERE m.id = $1 AND c.city = $2
    AND (COALESCE(NULLIF($3, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.id, mS.price`
    const values = [id, city, date]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (err) {
    cb(err, null)
  }
}

exports.getScheduleByCity = async (id, date, cb) => {
  try {
    const sql = `
    SELECT c.city as name
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m on mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST on mS.id = mST."movieScheduleId"
    WHERE m.id = $1
    AND (COALESCE(NULLIF($2, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.city`
    const values = [id, date]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (err) {
    cb(err, null)
  }
}

exports.bookedSeats = async (data, cb) => {
  try {
    const sql = `
    SELECT string_to_array(trim(string_agg(DISTINCT "seatNum", ',')), ',') as seats
    FROM "reserveSeats"
    WHERE "bookingDate" = $1
    AND "bookingTime" = $2
    AND "cinemaId" = $3
    AND "movieId" = $4`
    const values = [data.bookingDate, data.bookingTime, data.cinemaId, data.movieId]
    const result = await poolString.query(sql, values)
    cb(null, result)
  } catch (err) {
    cb(err, null)
  }
}
