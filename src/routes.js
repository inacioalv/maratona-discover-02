const express = require("express")
const routes = express.Router()


const views= __dirname+"/views/"

const Profiles={
   data:{ 
    name:"inacio",
    avatar:"https://github.com/inacioalv.png",
    "monthly-budget":3500,
    "days-per-week":6,
    "hours-per-day":8,
    "vacation-per-year":3,
    "value-hour":75
        },
    controllers:{
        index(request,response){
          return response.render(views+"profile",{Profiles:Profiles.data})
        },

        update(request,response){
            //req.body para pegar os dados
            const data = request.body

            //definir quantas semanas tem um ano:52
            const weeksPerYear= 52

            //remover as semanas de férias do ano,para pegar quantas semanas tem 1 mêS
            const weeksPerMonth =(weeksPerYear -data["vacation-per-year"])/12

            //total de horas trabalhado no mês
            const weekTotalHours = data["hours-per-day"]* data["days-per-week"]

            //horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            //qual será o valor da minha hora?
            const valueHour= data["monthly-budget"]/monthlyTotalHours
            

            Profiles.data= {
                ...Profiles.data,
                ...request.body,
                "value-hour":valueHour
            }  
            return response.redirect('/profile')
        }
    }
}

const jobR ={
    data:[
        {
            id:1,
            name:"Pizzaria",
            "daily-hours":8,
            "total-hours":60,
            created_at:Date.now(),
            
        },
        {
            id:2,
            name:"Pizzaria Guloso",
            "daily-hours":6,
            "total-hours":90,
            created_at:Date.now(),
            
        }
    
    ],


    controllers:{
        index(request,response){
          
            const updateJobs = jobR.data.map((job)=>{
                    //ajustes no job
                    const remaining = jobR.services. remainingDays(job);
                    const status = remaining <=0 ? 'done' :'progress'
            
                    return {
                        ...job,
                        remaining,
                        status,
                        budget:jobR.services.calculateBudget(job,Profiles.data["value-hour"])
                    };
                })
            
              return response.render(views+"index",{jobs:updateJobs})
            },

        createJob(request,response){
                const lastId = jobR.data[jobR.data.length -0]?.id || 1;

                jobR.data.push({
                    id:lastId+1,
                    name:request.body.name,
                    "daily-hours":request.body["daily-hours"],
                    "total-hours":request.body["total-hours"],
                    created_at:Date.now()
                })
                return response.redirect("/")
            },

        create(request,response){
             return response.render(views+"job")
            },
        show(request,response){

            const jobId= request.params.id

            //find irar procurar id
            const job = jobR.data.find(job => Number(job.id === Number(jobId)))
            

            if(!job){
                return response.send("job nod found!")
            }
            job.budget=jobR.services.calculateBudget(job,Profiles.data["value-hour"])

            return response.render(views+"job-edit",{job})
        },

        update(request,response){
            const jobId = request.params.id

            const job = jobR.data.find(job => Number(job.id)=== Number(jobId))

            if(!job){
                return response.send('job not found!')
            }

            const updateJob={
                ...job,
                name:request.body.name,
                "total-hours":request.body["total-hours"],
                "daily-hours":request.body["daily-hours"],
            }

            jobR.data = jobR.data.map(job =>{
                if(Number(job.id)=== Number(jobId)){
                    job=updateJob
                }

                return job

            })

            response.redirect('/job/'+jobId)
        },
        delete(request,response){
            const jobId = request.params.id

            jobR.data= jobR.data.filter(job => Number(job.id)!== Number(jobId))

            return response.redirect('/')
        }

        },

    services:{
        remainingDays(job) {
           //cálculo de tempo restante
           const remainingDays = 
           (job["total-hours"]/ job["daily-hours"]).toFixed();
   
           const createdDatte= new Date(job.created_at);
           const dueDay= createdDatte.getDate() + Number(remainingDays);
           const dueDateInMs = createdDatte.setDate(dueDay);
   
           const timeDiffInMs = dueDateInMs -Date.now();
           //trasformar milli em dias
           const dayInMs= 1000 *60 *60* 24
           const dayDiff = Math.floor(timeDiffInMs/dayInMs)
   
           //restam x dias
           return dayDiff
   
   },
   calculateBudget:(job,valueHour) => valueHour * job["total-hours"]
   },


   
}



routes.get('/',jobR.controllers.index);

routes.get('/job',jobR.controllers.create );

routes.post('/job',jobR.controllers.createJob);

routes.get('/job/:id',jobR.controllers.show);

routes.post('/job/:id',jobR.controllers.update);

routes.post('/job/delete/:id',jobR.controllers.delete);

routes.get('/profile',Profiles.controllers.index );

routes.post('/profile',Profiles.controllers.update );


module.exports=routes;