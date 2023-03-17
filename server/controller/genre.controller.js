const db = require('../db')

class GenreController {
    async createGenre(req, res) {
        const {name} = req.body;
        const newGenre = await db.query(`INSERT INTO genre(genre) VALUES ($1) RETURNING *`, [name]); 

        res.json(newGenre.rows[0]);
    }

    async getGenre(req, res) {
        const genre_id = req.query.id;
        const genre = genre_id == undefined ? 
            await db.query('SELECT * FROM genre') : 
            await db.query(`SELECT * FROM genre WHERE genre_id = $1`, [genre_id]);      
             
        res.json(genre.rows);
    }

    async updateGenre(req, res) {
        const {genre_id, name} = req.body;
        const genre = await db.query(`UPDATE genre SET genre = $1 
            WHERE genre_id = $2 RETURNING *`, [name, genre_id]);

        res.json(genre.rows[0]);
    }

    async deleteGenre(req, res) {
        const genre_id = req.params.id;
        const genre = await db.query(`DELETE FROM genre WHERE genre_id = $1`, [genre_id]);

        res.json(genre.rows);
    }

    async getGenreFilms(req, res) {
        const genre_id = req.params.id;
        const films = await db.query(`
            SELECT genre, name 
            FROM film_genre 
            JOIN film USING(film_id)
            JOIN genre USING(genre_id)
            WHERE genre_id = $1`, [genre_id]);

        res.json(films.rows);        
    }    
}

module.exports = new GenreController();