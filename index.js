const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

const films = JSON.parse(fs.readFileSync(path.join(__dirname, "films.json"), "utf-8"))

// pagina principal
app.get("/", (req, res) => {
    res.render("googlemovies", { films: films })
})

// busqueda
app.get("/search", (req, res) => {
    res.render("search", { films: films, results: null, busqueda: "" })
})

app.post("/search", (req, res) => {
    const nombre = req.body.nombre || ""
    let results = []
    // buscar por nombre
    for (let key in films) {
        if (key.toLowerCase().includes(nombre.toLowerCase())) {
            results.push({ titulo: key, info: films[key] })
        }
    }
    res.render("search", { films: films, results: results, busqueda: nombre })
})

// ver ficha de pelicula
app.get("/film/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title)
    if (films[title]) {
        res.render("film", { titulo: title, peli: films[title] })
    } else {
        res.render("film", { titulo: title, peli: null })
    }
})

app.listen(3000, () => {
    console.log("Servidor en puerto 3000")
})
