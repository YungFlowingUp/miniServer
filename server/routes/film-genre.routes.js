const Router = require('express');
const router = new Router();
const filmGenreController = require('../controller/film-genre.controller');

router.post('/film-genre', filmGenreController.createFilmGenre);
router.get('/film-genre', filmGenreController.getAllFilmsGenre);
router.delete('/film-genre', filmGenreController.deleteFilmGenre);

module.exports = router;