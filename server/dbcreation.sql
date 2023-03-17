DROP TABLE IF EXISTS genre, film, film_genre;

CREATE TABLE genre
(
	genre_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	genre varchar(30) UNIQUE NOT NULL
);

CREATE TABLE film
(
	film_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL,
	year smallint NOT NULL
);

CREATE TABLE film_genre
(
	film_id int REFERENCES film(film_id) ON DELETE CASCADE,
	genre_id int REFERENCES genre(genre_id) ON DELETE CASCADE,
	
	CONSTRAINT film_genre_pk PRIMARY KEY (film_id, genre_id)
);

INSERT INTO genre(genre) VALUES 
	('фантастика'),
	('драма'),
	('мелодрама'),
	('приключения'),
	('фэнтези'),
	('криминал');

INSERT INTO film(name, year) VALUES 
	('Зеленая миля', 1999),
	('Останься со мной', 1986),
	('Вечно молодой', 1992);
	
INSERT INTO film_genre(film_id, genre_id) VALUES 
	(1, 2),
	(1, 5),
	(1, 6),
	(2, 2),
	(2, 4),
	(3, 1),
	(3, 2),
	(3, 3);