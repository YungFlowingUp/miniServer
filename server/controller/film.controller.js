const db = require('../db')

class FilmController {
    async createFilm(req, res) {
        const {name, year} = req.body;
        const newFilm = await db.query(`INSERT INTO film(name, year) VALUES ($1, $2) RETURNING *`, [name, year]); 

        res.json(newFilm.rows[0]);
    }
   
    async getFilm(req, res) {
        const film_id = req.query.id;        
        const film = film_id == undefined ? 
            await db.query('SELECT * FROM film') :
            await db.query(`SELECT * FROM film WHERE film_id = $1`, [film_id]);

        res.json(film.rows);
    }

    async getFilmGenre(req, res) {
        const film_id = req.params.id;
        const genre = await db.query(`
            SELECT name, genre 
            FROM film_genre 
            JOIN film USING(film_id)
            JOIN genre USING(genre_id)
            WHERE film_id = $1`, [film_id]);

        res.json(genre.rows);

        /*
        let mes = "Фильм: " + genre.rows[0].name + "\nЖанры: ";
        for (let i = 0; i < genre.rows.length; i++) {             
                mes += genre.rows[i].genre + ", ";           
        }
        mes = mes.trim().slice(0, -1) + ".";
        res.send(mes);
        */
    }
    
    async updateFilm(req, res) {
        const {film_id, name, year} = req.body;
        const film = await db.query(`UPDATE film SET name = $1, year = $2 
            WHERE film_id = $3 RETURNING *`, [name, year, film_id]);

        res.json(film.rows[0]);
    }

    async deleteFilm(req, res) {
        const film_id = req.params.id;
        const film = await db.query(`DELETE FROM film WHERE film_id = $1`, [film_id]);

        res.json(film.rows);
    }
}

module.exports = new FilmController();