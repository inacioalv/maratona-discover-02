let data = [
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

]

module.exports ={
    get(){
        return data;
    },
    update(newJob){
        data= newJob;
    },
    delete(id){
        data= data.filter(job => Number(job.id)!== Number(id))
    }
}
