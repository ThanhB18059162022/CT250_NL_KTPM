let arr = [
    {id:1, name:"Alex"},
    {id:2, name:"VCT"}
]

module.exports = class PeopleController{
    getList = (req, res)=>{
        return res.json(arr);
    }
}