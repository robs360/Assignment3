"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const express = require('express');
const app = express();
app.use(express.json());
app.use((0, cors_1.default)());
exports.port = 3000;
app.use('/api', routes_1.default);
app.use(errorHandler_1.default);
app.get('/', function (req, res) {
    res.send('Hello World');
});
exports.default = app;
