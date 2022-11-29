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
    "movieCast" (
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

alter table "movieGenre"
add
    constraint "movieGenre_genres_id_fk" foreign key ("genreId") references genres on update cascade on delete cascade;

alter table "movieGenre"
add
    constraint "movieGenre_movies_id_fk" foreign key ("movieId") references movies on update cascade on delete cascade;

alter table "movieCast"
add
    constraint "movieCast_casts_id_fk" foreign key ("castId") references casts on update cascade on delete cascade;

alter table "movieCast"
add
    constraint "movieCast_movies_id_fk" foreign key ("movieId") references movies on update cascade on delete cascade;

alter table "movieSchedules"
add
    constraint "movieSchedules_cinemas_null_fk" foreign key ("cinemaId") references cinemas (id);

alter table "movieSchedules"
add
    constraint "movieSchedules_movies_null_fk" foreign key ("movieId") references movies (id);

alter table
    "movieScheduleTimes"
add
    constraint "movieScheduleTimes_movieSchedules_null_fk" foreign key ("movieScheduleId") references "movieSchedules" (id);

alter table transactions
add
    constraint transactions_cinemas_null_fk foreign key ("cinemaId") references cinemas (id);

alter table transactions
add
    constraint "transactions_movieSchedules_null_fk" foreign key ("movieScheduleId") references "movieSchedules" (id);

alter table transactions
add
    constraint transactions_movies_null_fk foreign key ("movieId") references movies (id);

alter table transactions
add
    constraint transactions_status_null_fk foreign key ("statusId") references status (id);

alter table "reserveSeats"
add
    constraint "reserveSeats_transactions_null_fk" foreign key ("transactionId") references transactions (id);

alter table users
add
    constraint users_roles_null_fk foreign key ("roleId") references roles (id);

alter table "resetPassword"
add
    constraint "resetPassword_users_null_fk" foreign key ("userId") references users (id);

alter table subscribers
add
    constraint subscribers_pk unique (email);

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
    ), (
        'Avengers: Infinity War',
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        '2018-04-25',
        'Anthony Russo',
        '02:29:00',
        'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.'
    ), (
        'Aquaman',
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg',
        '2018-12-07',
        'James Wan',
        '02:23:00',
        'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.'
    ), (
        'Black Adam',
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
        '2022-10-19',
        'Jaume Collet-Serra',
        '02:05:00',
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.'
    );

insert into subscribers (email)
values ('madiajijah7@gmail.com'), ('musmak@gmail.com');

insert into casts (name)
VALUES ('Tom Holland'), ('Michael Keaton'), ('Robert Downey Jr.'), ('Marisa Tomei'), ('Jon Favreau'), ('Gwyneth Paltrow'), ('Zendaya'), ('Donald Glover'), ('Jacob Batalon'), ('Chris Evans'), ('Scarlett Johansson'), ('Jeremy Renner'), ('Don Cheadle'), ('Paul Rudd'), ('Brie Larson'), ('Samuel L. Jackson'), ('Ben Mendelsohn'), ('Josh Brolin'), ('Chris Pratt'), ('Vin Diesel'), ('Bradley Cooper'), ('Zoe Saldana'), ('Dave Bautista'), ('Karen Gillan'), ('Pom Klementieff'), ('Elizabeth Debicki'), ('Chris Hemsworth'), ('Tessa Thompson'), ('Karl Urban'), ('Anthony Hopkins'), ('Idris Elba'), ('Jeff Goldblum'), ('Tessa Thompson'), ('Benedict Cumberbatch'), ('Chadwick Boseman'), ('Michael B. Jordan');

insert into
    cinemas (picture, name, address, city)
values (
        'https://21cineplex.com//theme/v5/assets/img/logo.png',
        'CINEMA 21',
        'Karang Rejo',
        'Tarakan'
    ), (
        'https://21cineplex.com//theme/v5/assets/img/logo.png',
        'CINEMA 21',
        'Jalan Akhmad Yani',
        'Banjarmasin'
    );

insert into
    "paymentMethods" (picture, name)
values (
        'https://toppng.com/uploads/preview/visa-logo-11530966316amvzjrobsf.png',
        'Visa'
    );

insert into status (name)
values (' Active '), (' Used '), (' Expired ');