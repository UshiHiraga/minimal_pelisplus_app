"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchData_1 = require("./modules/fetchData");
const app = (0, express_1.default)();
const port = 3000;
app.get("/Search/:query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    let response = yield (0, fetchData_1.newSearch)(req.params.query);
    res.status(200).json(response);
}));
app.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.title)
        return res.status(404).end("Title is void.");
    const data_json = yield (0, fetchData_1.newSearch)(String(req.query.title));
    res.status(200).json(data_json);
}));
app.get("/", (req, res) => { console.log(req); });
app.listen(port, () => console.log("El servidor está activo en el puerto " + port));
