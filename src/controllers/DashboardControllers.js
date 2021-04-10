const Job = require("../model/Job");
const Profiler = require("../model/Profiler");
const JobUtils = require("../utils/JobUtils")

module.exports = {
    index(request, response) {

        const jobs = Job.get()
        const profiles = Profiler.get()

        let statusCount={
            progress:0,
            done:0,
            total:jobs.length
        }

        //total de horas por dia de cada job em progresso
        let jobTotalHours =0;

        const updateJobs = jobs.map((job) => {
            //ajustes no job
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'

            //Somando a quantidade de status
            statusCount[status]+=1

            //total de horas por dia de cada job
            jobTotalHours = status === 'progress' ? jobTotalHours+ Number(job['daily-hours']) : jobTotalHours
            

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profiles["value-hour"])
            };
        })

        //quantidade de horas quero trabalhar(Profile)
        //menos 
        //quantidade de horas/dia de cada job em progress
        const freeHous = profiles["hours-per-day"] - jobTotalHours;

        return response.render("index", { jobs: updateJobs,profile:profiles,statusCount:statusCount,freeHous:freeHous })
    }
}