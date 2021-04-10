const express = require("express")
const routes = express.Router()
const ProfilerController = require("./controllers/ProfilerController")
const JobController = require("./controllers/JobController");
const DashboardControllers = require("./controllers/DashboardControllers");


routes.get('/',DashboardControllers.index);
routes.get('/job',JobController.create );
routes.post('/job',JobController.createJob);
routes.get('/job/:id',JobController.show);
routes.post('/job/:id',JobController.update);
routes.post('/job/delete/:id',JobController.delete);
routes.get('/profile',ProfilerController.index );
routes.post('/profile',ProfilerController.update );

module.exports=routes;