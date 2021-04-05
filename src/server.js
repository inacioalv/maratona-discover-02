const express = require("express")
const server= express()
const routes = require("./routes")
server.set("view engine","ejs")

server.use(express.static("public"))

//usar request.body
server.use(express.urlencoded({extended:true}))

server.use(routes)


server.listen(3300, ()=> console.log("Serve"))