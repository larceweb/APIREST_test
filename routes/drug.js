const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config.db");

const getDrug = (request, response) => {
    connection.query("SELECT * FROM drug",
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        });
};


//ruta
app.route("/drug")
    .get(getDrug);


const postDrug = (request, response) => {
    const { name, approved, min_dose, max_dose, available_at } = request.body;
    connection.query("INSERT INTO drug(name, approved, min_dose, max_dose, available_at) VALUES (?,?,?,?,?) ", [name, approved, min_dose, max_dose, available_at],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
        });
};

//ruta
app.route("/drug")
    .post(postDrug);


const delDrugs = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from drug where id = ?", [id],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Item eliminado": results.affectedRows });
        });
};

//ruta
app.route("/drug/:id")
    .delete(delDrugs);


module.exports = app;