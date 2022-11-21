create database mexl_cinema;

create table
    "roles" (
        "id" int primary key generated always as identity,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

CREATE TABLE
    "users" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" varchar,
        "firstName" varchar,
        "lastName" varchar,
        "phoneNumber" varchar,
        "email" varchar,
        "password" varchar,
        "roleId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "resetPassword" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "email" varchar,
        "userId" int,
        "code" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movies" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "title" varchar,
        "picture" varchar,
        "releaseDate" date,
        "director" varchar,
        "duration" time,
        "synopsis" text,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "genres" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieGenre" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "movieId" int,
        "genreId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "casts" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieCasts" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "movieId" int,
        "castId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "cinemas" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" varchar,
        "name" varchar,
        "address" varchar,
        "city" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieSchedules" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "movieId" int,
        "cinemaId" int,
        "price" bigint,
        "startDate" date,
        "endDate" date,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieScheduleTimes" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "time" time,
        "movieScheduleId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "status" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "transactions" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "bookingDate" timestamptz,
        "movieId" int,
        "cinemaId" int,
        "movieScheduleId" int,
        "fullName" varchar,
        "email" varchar,
        "phoneNumber" varchar,
        "statusId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "reserveSeats" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "seatNum" varchar,
        "transactionId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "paymentMethods" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" varchar,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "subscribers" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "email" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

insert into roles (name) values ('Admin'), ('User');

insert into
    users (
        picture,
        "firstName",
        "lastName",
        "phoneNumber",
        email,
        password,
        "roleId"
    )
values (
        'https://avatars.githubusercontent.com/u/20562116?v=4',
        'Dian',
        'Rahmadani',
        '82256964453',
        'admin@gmail.com',
        'admin123',
        '1'
    ), (
        'https://avatars.githubusercontent.com/u/47699978?v=4',
        'Victoria',
        'Lo',
        '85156233534',
        'victoria@gmail.com',
        'victoria123',
        '2'
    );

insert into genres (name)
values ('Action'), ('Adventure'), ('Animation'), ('Comedy'), ('Crime'), ('Documentary'), ('Drama'), ('Family'), ('Fantasy'), ('History'), ('Horror'), ('Music'), ('Mystery'), ('Romance'), ('Science Fiction'), ('TV Movie'), ('Thriller'), ('War'), ('Western');

insert into
    movies (
        title,
        picture,
        "releaseDate",
        director,
        duration,
        synopsis
    )
values (
        'Spider-Man: Homecoming',
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
        '2017-06-28',
        'Jon Watss',
        '02:13:00',
        'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.'
    );

insert into
    "movieGenre" ("movieId", "genreId")
values ('1', '1'), ('1', '2'), ('1', '7'), ('1', '15');

insert into subscribers (email)
values ('madiajijah7@gmail.com'), ('musmak@gmail.com');

insert into casts (name)
VALUES ('Tom Holland'), ('Michael Keaton'), ('Robert Downey Jr.'), ('Marisa Tomei'), ('Jon Favreau'), ('Gwyneth Paltrow'), ('Zendaya'), ('Donald Glover'), ('Jacob Batalon');

insert into
    cinemas (picture, name, address, city)
values (
        'https://21cineplex.com//theme/v5/assets/img/logo.png',
        'CINEMA 21',
        'Karang Rejo, Tarakan Barat',
        'Tarakan'
    );

insert into
    "movieCasts" ("movieId", "castId")
VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('1', '6'), ('1', '7'), ('1', '8'), ('1', '9');

insert into
    "movieSchedules" (
        "movieId",
        "cinemaId",
        price,
        "startDate",
        "endDate"
    )
values (
        '1',
        '1',
        '60000',
        '2017-07-06',
        '2017-07-08'
    );

insert into
    "movieScheduleTimes" (time, "movieScheduleId")
values ('10:30:00', '1');

insert into
    "paymentMethods" (picture, name)
values (
        'https://toppng.com/uploads/preview/visa-logo-11530966316amvzjrobsf.png',
        'Visa'
    );

insert into
    "resetPassword" (email, "userId", code)
values (
        'victoria@gmail.com',
        '2',
        'V1CT'
    );

insert into
    "reserveSeats" ("seatNum", "transactionId")
values ('C4', '1');

insert into status (name) values ('Active'), ('Used'), ('Expired');

insert into
    transactions (
        "bookingDate",
        "movieId",
        "cinemaId",
        "movieScheduleId",
        "fullName",
        email,
        "phoneNumber",
        "statusId"
    )
values (
        '2017-07-07 01:02:00 +08',
        '1',
        '1',
        '1',
        'Victoria Lo',
        'victoria@gmail.com',
        '85156233534',
        '1'
    );
