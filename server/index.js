const express = require('express');
const filmRouter = require('./routes/film.routes');
const genreRouter = require('./routes/genre.routes');
const filmGenreRouter = require('./routes/film-genre.routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', filmRouter);
app.use('/api', genreRouter);
app.use('/api', filmGenreRouter);

app.listen(PORT, () => console.log(`Server working on Port: ${PORT}`));