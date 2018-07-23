CREATE DATABASE "movie_collection";

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title character varying(200) NOT NULL,
    genre_id integer NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    director character varying(50) NOT NULL,
    released integer NOT NULL,
    synopsis text,
    revenue integer,
    runtime integer,
    budget integer,
    star1 character varying(50),
    star2 character varying(50),
    star3 character varying(50),
    image_path character varying(400),
    db_id integer
);


CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
  	"genre" VARCHAR(200) NOT NULL
);

--Here's the data for 'Up!' 
INSERT INTO "public"."movies"("title", "genre_id", "director", "released", "synopsis", "revenue", "runtime", "budget", "star1", "star2", "star3", "image_path", "db_id") 
VALUES('Up!', 2, 'Bob Peterson', 2009, 'Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.', 735099082, 96, 175000000, 'Ed Asner', 'Christopher Plummer', 'Jordan Nagai', '/nk11pvocdb5zbFhX5oq5YiLPYMo.jpg', 14160);