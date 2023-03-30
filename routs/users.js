import express, { json, response } from 'express'
import {createUser,getUserById,deleteUserById,updateUser} from '../controller/users.js'
import myJson from '../users.json' assert {type: 'json'};
 
const routers = express.Router()

const users = [
  myJson
]

//All users in this module starting here with /users
routers.get('/',(req,res)=>{
    res.send(users)
})

 routers.post('/', createUser)



routers.get('/:id', getUserById)

routers.delete('/:id',deleteUserById)

routers.patch('/:id',updateUser)

export default routers