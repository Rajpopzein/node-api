import { v4 as uuidv4 } from 'uuid';

let userss =[
    
]


export const getAllUser = (req,res) => {
    res.status(200).json({status:'Sucess', data:userss})
}


export const createUser = (req,res)=>{
    const user = req.body
    // const userId = uuidv4();
    const name= req.body.name
    const id = uuidv4()
    const existingDataCheck = userss.find((user)=>user.name == req.body.name)
    if(existingDataCheck == undefined)
    {
        const userWithId = {...user, id}
        userss.push(userWithId)
        res.status(201).json({status:'ok'})
    }
    else{
        res.status(403).json({status:'user already exist'})
    }
   
}

export const getUserById = async (req,res)=>{
    const {id} = req.params

   
    const userData = await userss.find((user) => user.id == id)

    // res.status(200).json({status:'Success', data:userData})

    if(userData == undefined){
        res.status(404).json({status:"User not found"})
    }
    else{
        res.status(200).json({status:'success', data:userData})
    }
}


export const deleteUserById = (req,res)=>{
    const {id} = req.params

    const deletedId = userss.filter((user)=> user.id != id)
    // console.log(`Sooli mudenjathu`)
    res.status(200).json({status:'Success'})
}

export const updateUser = (req,res)=>{
    const {id} = req.params

    const user = userss.filter((user)=>user.id == id)

    const {name,age,address} = req.body;

    if(name){
        user.name = name
    }
    if(age){
        user.age = age
    }
    if(address){
        user.address = address
    }
    res.status(200).json({status:'Updated sucessfully'})
}

