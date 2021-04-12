const Job = require("../model/Job")
const jobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profiler")

module.exports = {
    async createJob(request, response) {
        // const jobs = await Job.get()
        // const lastId = jobs[jobs.length - 0]?.id || 1;

        await Job.create(
            {
                //id: lastId + 1,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                created_at: Date.now()
            }
        )



        return response.redirect("/")
    },

    create(request, response) {
        return response.render("job")
    },

    async show(request, response) {

        const jobId = request.params.id
        const profiles = await Profile.get()
        const jobs = await Job.get()

        //find irar procurar id
        const job = jobs.find(job => Number(job.id === Number(jobId)))


        if (!job) {
            return response.send("job nod found!")
        }
        job.budget = jobUtils.calculateBudget(job, profiles["value-hour"])

        return response.render("job-edit", { job })
    },

    async update(request, response) {
        const jobId = request.params.id

        const updateJob = {
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }


        await Job.update(updateJob, jobId)

        response.redirect('/job/' + jobId)
    },

    async delete(request, response) {
        const jobId = request.params.id

        await Job.delete(jobId)

        return response.redirect('/')
    }

}