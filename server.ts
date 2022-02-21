import express from "express";
import { newSearch } from "./modules/fetchData";

const app = express();
const port = 3000

app.get("/Search/:query", async (req:any, res:any) => {
    console.log(req.query);
    let response = await newSearch(req.params.query);
    res.status(200).json(response);
})

app.get("/search", async (req, res) => {
    if(!req.query.title) return res.status(404).end("Title is void.");
    const data_json = await newSearch(String(req.query.title));
    res.status(200).json(data_json);
})

app.get("/", (req, res) => {console.log(req)});

app.listen(port, () => console.log("El servidor está activo en el puerto " + port));