import { v4 as uuidv4 } from 'uuid';





let users =[]



export const createUser = (req,res)=>{
    const user = req.body
    // const userId = uuidv4();
    const userWithId = {...user, Id:uuidv4()}
    users.push(userWithId)
    res.send(req.body)
}

export const getUserById = (req,res)=>{
    const {id} = req.params

    const userData = users.find((user) => user.id == id)

    console.log(userData)

    res.send(userData)
}

export const deleteUserById = (req,res)=>{
    const {id} = req.params

    const deletedId = users.filter((user)=> user.id != id)
    // console.log(`Sooli mudenjathu`)
    res.send(`Sooli mudenjathu`)
}

export const updateUser = (req,res)=>{
    const {id} = req.params

    const user = users.filter((user)=>user.id == id)

    const {name,age} = req.body;

    if(name){
        user.name = name
    }
    if(age){
        user.age = age
    }
    res.send(`Updated sucessfull`)
}

