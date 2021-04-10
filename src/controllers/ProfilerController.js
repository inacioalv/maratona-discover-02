const Profile = require("../model/Profiler")

module.exports = {
    index(request,response){
      return response.render("profile",{Profiles:Profile.get()})
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
        

        Profile.update({
            ...Profile.get(),
            ...request.body,
            "value-hour":valueHour
        })
        
        return response.redirect('/profile')
    }
}