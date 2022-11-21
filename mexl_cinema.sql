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
