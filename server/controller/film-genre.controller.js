const db = require('../db')

async function _turnFilmToID(film) {
    return typeof(film) === "number" ? 
    film : 
    (await db.query(`SELECT film_id FROM film WHERE name = $1`, [film])).rows[0].film_id;
}

async function _turnGenreToID(genre) {
    return typeof(genre) === "number" ?
    genre :   
    (await db.query(`SELECT genre_id FROM genre WHERE genre = $1`, [genre])).rows[0].genre_id;
}

class FilmGenreController {
    async getAllFilmsGenre(req, res) {
        const allFilmsGenre = await db.query(`
            SELECT name, genre 
            FROM film_genre
            JOIN film USING(film_id)
            JOIN genre USING(genre_id)
            ORDER BY name`);

        res.json(allFilmsGenre.rows);
    }   

    async createFilmGenre(req, res) {
        const {film, genre} = req.body;        
        
        const film_genre = await db.query(`INSERT INTO film_genre(film_id, genre_id) VALUES ($1, $2) RETURNING *`, 
                                        [await _turnFilmToID(film), await _turnGenreToID(genre)]);
        
        res.json(film_genre.rows);
    }
    
    async deleteFilmGenre(req, res) {        
        const {film, genre} = req.body;   

        const film_genre = await db.query(`DELETE FROM film_genre WHERE film_id = $1 AND genre_id = $2 RETURNING *`, 
                                        [await _turnFilmToID(film), await _turnGenreToID(genre)]);

        res.json(film_genre.rows);
    }
}

module.exports = new FilmGenreController();