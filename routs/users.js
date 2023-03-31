import express, { json, response } from 'express'
import {createUser,getUserById,deleteUserById,updateUser,getAllUser} from '../controller/users.js'


 
const routers = express.Router()


//All users in this module starting here with /users

routers.post('/', createUser)

routers.get('/all',getAllUser)

routers.get('/:id', getUserById)

routers.delete('/:id',deleteUserById)

routers.patch('/:id',updateUser)

export default routers