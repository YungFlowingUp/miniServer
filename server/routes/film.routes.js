const Router = require('express');
const router = new Router();
const filmController = require('../controller/film.controller');

router.post('/film', filmController.createFilm);
router.get('/film', filmController.getFilm);
router.put('/film', filmController.updateFilm);
router.delete('/film/:id', filmController.deleteFilm);

router.get('/film-genre/:id', filmController.getFilmGenre);

module.exports = router;
