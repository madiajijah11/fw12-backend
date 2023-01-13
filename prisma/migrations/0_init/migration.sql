-- CreateTable
CREATE TABLE "casts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "casts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinemas" (
    "id" SERIAL NOT NULL,
    "picture" VARCHAR,
    "name" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "cinemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movieCast" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "castId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "movieCasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movieGenre" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "genreId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "movieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movieScheduleTimes" (
    "id" SERIAL NOT NULL,
    "time" TIME(6),
    "movieScheduleId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "movieScheduleTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movieSchedules" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "cinemaId" INTEGER,
    "price" INTEGER,
    "startDate" DATE,
    "endDate" DATE,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "movieSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "picture" VARCHAR,
    "releaseDate" DATE,
    "director" VARCHAR,
    "duration" TIME(6),
    "synopsis" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentMethods" (
    "id" SERIAL NOT NULL,
    "picture" VARCHAR,
    "name" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserveSeats" (
    "id" SERIAL NOT NULL,
    "seatNum" VARCHAR,
    "transactionId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "bookingDate" DATE,
    "bookingTime" TIME(6),
    "movieId" INTEGER,
    "cinemaId" INTEGER,

    CONSTRAINT "reserveSeats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resetPassword" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "userId" INTEGER,
    "code" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "resetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR,
    "email" VARCHAR,
    "phoneNumber" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "paymentMethodId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "picture" VARCHAR,
    "firstName" VARCHAR,
    "lastName" VARCHAR,
    "phoneNumber" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "roleId" INTEGER DEFAULT 2,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_pk" ON "subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_pk" ON "users"("email");

-- AddForeignKey
ALTER TABLE "movieCast" ADD CONSTRAINT "movieCast_casts_id_fk" FOREIGN KEY ("castId") REFERENCES "casts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieCast" ADD CONSTRAINT "movieCast_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieGenre" ADD CONSTRAINT "movieGenre_genres_id_fk" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieGenre" ADD CONSTRAINT "movieGenre_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieScheduleTimes" ADD CONSTRAINT "movieScheduleTimes_movieSchedules_null_fk" FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movieSchedules" ADD CONSTRAINT "movieSchedules_cinemas_null_fk" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movieSchedules" ADD CONSTRAINT "movieSchedules_movies_null_fk" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserveSeats" ADD CONSTRAINT "reserveSeats_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserveSeats" ADD CONSTRAINT "reserveSeats_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserveSeats" ADD CONSTRAINT "reserveSeats_transactions_null_fk" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resetPassword" ADD CONSTRAINT "resetPassword_users_null_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_paymentMethods_null_fk" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_users_null_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roles_null_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

