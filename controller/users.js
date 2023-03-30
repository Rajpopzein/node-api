import { v4 as uuidv4 } from 'uuid';





let userss =[
    {'name':'raj'}
]


export const getAllUser = (req,res) => {
    res.send(userss)
}


export const createUser = (req,res)=>{
    const user = req.body
    // const userId = uuidv4();
    const userWithId = {...user, Id:uuidv4()}
    userss.push(userWithId)
    console.log(userss)
    res.send(req.body)
}

export const getUserById = (req,res)=>{
    const {id} = req.params

    const userData = userss.find((user) => user.id == id)

    console.log(userData)

    res.send(userData)
}

export const deleteUserById = (req,res)=>{
    const {id} = req.params

    const deletedId = userss.filter((user)=> user.id != id)
    // console.log(`Sooli mudenjathu`)
    res.send(`Sooli mudenjathu`)
}

export const updateUser = (req,res)=>{
    const {id} = req.params

    const user = userss.filter((user)=>user.id == id)

    const {name,age} = req.body;

    if(name){
        user.name = name
    }
    if(age){
        user.age = age
    }
    res.send(`Updated sucessfull`)
}

