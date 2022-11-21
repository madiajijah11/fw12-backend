create database mexl_cinema;

create table
    "roles" (
        "id" int primary key generated always as identity,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "users" (
        "id" int primary key generated always as identity,
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
        "id" int primary key generated always as identity,
        "email" varchar,
        "userId" int,
        "code" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movies" (
        "id" int primary key generated always as identity,
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
        "id" int primary key generated always as identity,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieGenre" (
        "id" int primary key generated always as identity,
        "movieId" int,
        "genreId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "casts" (
        "id" int primary key generated always as identity,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieCasts" (
        "id" int primary key generated always as identity,
        "movieId" int,
        "castId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "cinemas" (
        "id" int primary key generated always as identity,
        "picture" varchar,
        "name" varchar,
        "address" varchar,
        "city" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "movieSchedules" (
        "id" int primary key generated always as identity,
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
        "id" int primary key generated always as identity,
        "time" time,
        "movieScheduleId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "status" (
        "id" int primary key generated always as identity,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "transactions" (
        "id" int primary key generated always as identity,
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
        "id" int primary key generated always as identity,
        "seatNum" varchar,
        "transactionId" int,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "paymentMethods" (
        "id" int primary key generated always as identity,
        "picture" varchar,
        "name" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );

create table
    "subscribers" (
        "id" int primary key generated always as identity,
        "email" varchar,
        "createdAt" timestamptz default now(),
        "updatedAt" timestamptz
    );