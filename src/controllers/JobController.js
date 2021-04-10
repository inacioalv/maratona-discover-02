const Job = require("../model/Job")
const jobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profiler")

module.exports = {
    createJob(request, response) {
        const jobs = Job.get()

        const lastId = jobs[jobs.length - 0]?.id || 1;

        jobs.push({
            id: lastId + 1,
            name: request.body.name,
            "daily-hours": request.body["daily-hours"],
            "total-hours": request.body["total-hours"],
            created_at: Date.now()
        })
        return response.redirect("/")
    },

    create(request, response) {

        return response.render("job")
    },
    show(request, response) {

        const jobId = request.params.id
        const profiles = Profile.get()
        const jobs = Job.get()

        //find irar procurar id
        const job = jobs.find(job => Number(job.id === Number(jobId)))


        if (!job) {
            return response.send("job nod found!")
        }
        job.budget = jobUtils.calculateBudget(job, profiles["value-hour"])

        return response.render("job-edit", { job })
    },

    update(request, response) {

        const jobId = request.params.id
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return response.send('job not found!')
        }

        const updateJob = {
            ...job,
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updateJob
            }

            return job

        })

        Job.update(newJobs)

        response.redirect('/job/' + jobId)
    },
    delete(request, response) {
        const jobId = request.params.id

        Job.delete(jobId)

        return response.redirect('/')
    }

}