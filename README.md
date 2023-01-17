# MexL Cinema API

A brief description of what this project does and who it's for

## API Reference

#### Get all movies

```http
GET /api/v1/movies
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `page`    | `string` | **Optional**. page 1           |
| `limit`   | `string` | **Optional**. limit 8          |
| `sort`    | `string` | **Optional**. sort releaseDate |
| `order`   | `string` | **Optional**. order desc       |
| `search`  | `string` | **Optional**.                  |

#### Get item

```http
GET /api/v1/movies/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of movie to fetch |

#### Get now showing movies

```http
GET /api/v1/movies/nowShowing
```

#### Get up coming movies

```http
GET /api/v1/movies/upComing
```

## Authors

- [@madiajijah11](https://www.github.com/madiajijah11)
