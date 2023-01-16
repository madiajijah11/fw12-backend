const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getMovies = async (req, res) => {
  req.query.page = req.query.page || 1;
  req.query.limit = req.query.limit || 8;
  req.query.sort = req.query.sort || "releaseDate";
  req.query.order = req.query.order || "desc";
  req.query.search = req.query.search || "";
  try {
    const getMovies = await prisma.movies.findMany({
      skip: (req.query.page - 1) * req.query.limit,
      take: parseInt(req.query.limit),
      orderBy: {
        [req.query.sort]: req.query.order,
      },
      where: {
        title: {
          contains: req.query.search,
        },
      },
      include: {
        movieGenre: {
          select: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const pageInfo = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      totalData: getMovies.length,
      totalPage: Math.ceil(getMovies.length / req.query.limit),
    };
    res.status(200).json({
      status: true,
      message: "Movies retrieved successfully",
      pageInfo,
      results: getMovies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const getMovie = await prisma.movies.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        movieGenre: {
          select: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "Movie retrieved successfully",
      results: getMovie,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.nowShowing = async (req, res) => {
  req.query.limit = req.query.limit || 5;
  try {
    const nowShowing = await prisma.movies.findMany({
      take: parseInt(req.query.limit),
      where: {
        movieSchedules: {
          some: {
            startDate: {
              lte: new Date(),
            },
            endDate: {
              gte: new Date(),
            },
          },
        },
      },
      include: {
        movieGenre: {
          select: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "Now showing movies retrieved successfully",
      results: nowShowing,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.upComing = async (req, res) => {
  req.query.limit = req.query.limit || 5;
  req.query.month = req.query.month || new Date().getMonth() + 1;
  try {
    const upComing = await prisma.movies.findMany({
      take: parseInt(req.query.limit),
      where: {
        releaseDate: {
          gte: new Date(new Date().getFullYear(), req.query.month - 1, 1),
          lte: new Date(new Date().getFullYear(), req.query.month, 0),
        },
      },
      include: {
        movieGenre: {
          select: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "Up coming movies retrieved successfully",
      results: upComing,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getSchedulesByMovieId = async (req, res) => {
  const { id } = req.params;
  req.query.city = req.query.city || "";
  req.query.date = req.query.date || new Date();
  try {
    const schedules = await prisma.movies
      .findUnique({
        where: {
          id: parseInt(id),
        },
      })
      .movieSchedules({
        include: {
          cinemas: {
            select: {
              picture: true,
              name: true,
              address: true,
              city: true,
            },
          },
          movieScheduleTimes: {
            select: {
              time: true,
            },
          },
        },
        where: {
          cinemas: {
            city: {
              contains: req.query.city,
            },
          },
          startDate: {
            lte: new Date(req.query.date),
          },
          endDate: {
            gte: new Date(req.query.date),
          },
        },
      });
    res.status(200).json({
      status: true,
      message: "Schedules retrieved successfully",
      results: schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getSchedulesByCity = async (req, res) => {
  const { id } = req.params;
  req.query.date = req.query.date || new Date();
  try {
    const city = await prisma.movies.findMany({
      where: {
        id: parseInt(id),
      },
      select: {
        movieSchedules: {
          where: {
            startDate: {
              lte: new Date(req.query.date),
            },
            endDate: {
              gte: new Date(req.query.date),
            },
          },
          select: {
            cinemas: {
              select: {
                city: true,
              },
            },
          },
        },
      },
    });
    const cityList = city[0].movieSchedules.map((item) => item.cinemas.city);
    const uniqueCity = [...new Set(cityList)];
    res.status(200).json({
      status: true,
      message: "City retrieved successfully",
      results: uniqueCity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
