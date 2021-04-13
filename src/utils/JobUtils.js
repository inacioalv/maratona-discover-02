module.exports =  {
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
       const dayDiff = Math.ceil(timeDiffInMs/dayInMs)

       //restam x dias
       return dayDiff

},
calculateBudget:(job,valueHour) => valueHour * job["total-hours"]
}