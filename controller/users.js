import { v4 as uuidv4 } from 'uuid';
import {MongoClient} from 'mongodb';
import {ServerApiVersion} from 'mongodb'




const uri = "mongodb+srv://rajkumarr:popzein_helen_123@cluster0.lrnwsdq.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const database = client.db("testing");
const test = database.collection("test");

const createuser = async(data) =>{
    try{
      
      const doc = data
      const result =await test.insertOne(doc)  
      console.log(`document was inserted ${result._id}`)
  
    }finally{
      await client.close();
    }
  }





let userss =[]


export const getAllUser = async(req,res) => {
    try{
        const alldata = await test.find({}).toArray()
    console.log(alldata)
    res.status(200).json({status:'ok', data:alldata})
    client.close();
    }
    catch(e){
        console.log("error fetching data",e)
    }
}



export const createUser = async(req,res)=>{
    const user = req.body;
    // const userId = uuidv4();
    const name= req.body.name;
    const id = uuidv4();
    const userss =(await test.find({}).toArray());
    const existingDataCheck = userss.find((users)=> users.name == user.name);
    console.log(existingDataCheck);
    if(existingDataCheck == undefined)
    {
        const userWithId = {...user, id};

// ////////////////////////////////////////////////////////////////////////////////
        createuser(userWithId);
// ////////////////////////////////////////////////////////////////////////////////////
        res.status(201).json({status:'ok'});
    }
    else{
        res.status(403).json({status:'user already exist'});
    }
   
}

export const getUserById = async (req,res)=>{
    const {id} = req.params;

   
    const userData = await userss.find((user) => user.id == id);

    // res.status(200).json({status:'Success', data:userData})

    if(userData == undefined){
        res.status(404).json({status:"User not found"});
    }
    else{
        res.status(200).json({status:'success', data:userData});
    }
}


export const deleteUserById = async(req,res)=>{
    const {id} = req.params;
    const alldata = await test.find({}).toArray();
    const deletedId = userss.filter((user)=> user.id != id);

    for (let data in alldata){
        console.log('>>>>>>>',data)
    }
    res.status(200).json({status:'Success'});
}

export const updateUser = (req,res)=>{
    const {id} = req.params;

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
