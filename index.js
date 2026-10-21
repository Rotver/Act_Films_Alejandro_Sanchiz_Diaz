const express = require("express")
const path = require("path")
const fs = require("fs").promises //No npm i fs





app.get("/",(req,res)=>{
    res.render("googlemovies.ejs", {titulo:"Hola",Subtitulo:""})

})

app.get("/search",(req,res)=>{
    res.render("search.esj",{nombre})
})