let data = {
    name: "inacio",
    avatar: "https://github.com/inacioalv.png",
    "monthly-budget": 3500,
    "days-per-week": 6,
    "hours-per-day": 8,
    "vacation-per-year": 3,
    "value-hour": 75
};


module.exports={
    get(){
        return data;
    },
    update(newDate){
        data=newDate
    }
}