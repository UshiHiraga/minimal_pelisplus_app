import express from "express";
import * as Basic from "./modules/functions_basic.js";
import * as Movie from "./modules/functions_movies.js";

const app = express();
const port = 3000;

app.get("/api/searchByName", async (req, res) => {
    if(!req.query.title) return res.status(404).end("Title is void.");
    res.status(200).json(await Basic.searchByName(req.query.title));
});

// Rutas para películas
app.get("/api/getMovieServers", async (req, res) => {
    if(!req.query.id) return res.status(404).end("Movie ID is void.");
    res.status(200).json(await Movie.getMovieServers(req.query.id));
});

app.listen(port, () => console.log("El servidor está activo en el puerto " + port));