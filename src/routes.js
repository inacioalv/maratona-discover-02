const express = require("express")
const routes = express.Router()

const profiles={
    name:"inacio",
    avatar:"https://avatars.githubusercontent.com/u/51245154?s=400&u=27ce106fb0b067992d4f7cf14fe1ae1348e6ad73&v=4",
    "monthly-budget":3500,
    "days-per-week":6,
    "hours-per-day":8,
    "vacation-per-year":3
}

const views= __dirname+"/views/"

routes.get('/',(request,response)=> response.render(views+"index"));

routes.get('/job',(request,response)=> response.render(views+"job"));

routes.get('/job/edit',(request,response)=> response.render(views+"job-edit"));

routes.get('/profile',(request,response)=> response.render(views+"profile",{profiles}));


module.exports=routes;