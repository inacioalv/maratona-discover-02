const express = require("express")
const server= express()
const routes = require("./routes")
const path = require("path")

//usando template engine
server.set("view engine","ejs")

//Mudar a localização da pasta views
server.set("views",path.join(__dirname,"views"))

//habilitar arquivos statics
server.use(express.static("public"))

//usar request.body
server.use(express.urlencoded({extended:true}))

server.use(routes)


server.listen(3300, ()=> console.log("Serve"))