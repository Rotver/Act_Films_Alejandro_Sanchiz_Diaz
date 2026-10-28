
const express = require("express")   
const path = require("path")                
const fs = require("fs")                  
const app = express()                       

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname, "public")))


app.use(express.urlencoded({ extended: true }))

const films = JSON.parse(fs.readFileSync(path.join(__dirname, "films.json"), "utf-8"))

app.get("/", (req, res) => {
    res.render("googlemovies", { films: films })
})


app.get("/search", (req, res) => {
    const q = (req.query.q || "").trim()
    if (q === "") {
        return res.redirect("/")
    }
    const results = []
    for (let titulo in films) {
        if (titulo.toLowerCase().includes(q.toLowerCase())) {
            results.push({ titulo: titulo, info: films[titulo] })
        }
    }


    if (results.length === 0) {
        return res.status(404).render("notfound", { busqueda: q })
    }
    res.render("search", { q: q, results: results })
})

app.get("/film/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title)

    if (films[title]) {
        res.render("film", { titulo: title, peli: films[title] })
    } else {
        res.status(404).render("notfound", { busqueda: title })
    }
})

app.use((req, res) => {
    res.status(404).render("notfound", { busqueda: req.path })
})

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})
