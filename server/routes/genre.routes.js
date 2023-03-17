const Router = require('express');
const router = new Router();
const genreController = require('../controller/genre.controller');

router.post('/genre', genreController.createGenre);
router.get('/genre', genreController.getGenre);
router.put('/genre', genreController.updateGenre);
router.delete('/genre/:id', genreController.deleteGenre);

router.get('/genre-film/:id', genreController.getGenreFilms);

module.exports = router;
