const router =  require ("express").Router()
const fs = require ("fs")
let database = require ("../db/db.json") 


// localhost;3001/api
router.get("/notes", (req,res)=>{
    res.json(database)
})


router.post("/notes",(req,res)=>{
    //model
let newNote = {
    title: req.body.title, 
    text: req.body.text,
    id: Math.random()
}
database.push(newNote)

 fs.writeFileSync("./db/db.json", JSON.stringify(database))

    res.json(database)
})

module.exports = router
