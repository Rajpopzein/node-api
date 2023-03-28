import express, { json } from 'express'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'


const routers = express.Router()




const users = [
    {
        id:'1',
        name:"mon",
        age:"90",
    
    },
    {
        id:'2',
        name:"monds",
        age:"40",
    }
]

//All users in this module starting here with /users
routers.get('/',(req,res)=>{
    res.send(users)
})

 routers.post('/',(req,res)=>{
    const user = req.body
    // const userId = uuidv4();
    const userWithId = {...user, Id:uuidv4()}
    users.push(userWithId)
    res.send(req.body)
})



routers.get('/:id',(req,res)=>{
    const {id} = req.params

    const userData = users.find((user) => user.id == id)

    console.log(userData)

    res.send(userData)
})

export default routers