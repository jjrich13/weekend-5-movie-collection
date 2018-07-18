CREATE DATABASE "movie_collection";

CREATE TABLE "movies" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(200) NOT NULL,
  "genre_id" INT NOT NULL REFERENCES "genres",
  "director" VARCHAR(50) NOT NULL,
  "released" INT NOT NULL,
  "image_path" VARCHAR(400)
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
  	"genre" VARCHAR(200) NOT NULL
);

INSERT INTO "genres" ("genre") 
VALUES ('Drama');

INSERT INTO "movies" ("title", "genre_id", "director", "released", "image_path") 
VALUES ('Gladiator', 1, 'Ridley Scott', '2000', 'gladiator_image');