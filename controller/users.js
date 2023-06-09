import { v4 as uuidv4 } from 'uuid';
import {MongoClient} from 'mongodb';
import {ServerApiVersion} from 'mongodb'


const uri = "mongodb+srv://rajkumarr:popzein_helen_123@cluster0.lrnwsdq.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const database = client.db("testing");
const test = database.collection("test");

const createuser = async(data) => {
    try{
      const doc = data
      const result =await test.insertOne(doc)  
      console.log(`document was inserted ${result}`)
    }
    catch(e){
        console.log('eoor',e)
    }
    
}

let userss =[]

export const getAllUser = async(req,res) => {
    const client = new MongoClient(uri)
    try{
    const alldata = await test.find({}).toArray()
    // console.log(alldata)
    res.status(200).json({status:'ok', data:alldata})
    }
    catch(e){
        console.log("Error fetching data",e)
    }
    finally{
        await client.close();
    }
}

export const createUser = async(req,res) => {
    const client = new MongoClient(uri)
    const user = req.body;
    // const userId = uuidv4();
    const name= req.body.name;
    const id = uuidv4();
    const userss =(await test.find({}).toArray());
    const existingDataCheck = userss.find((users)=> users.name == user.name);
    // console.log(existingDataCheck);
    if(existingDataCheck == undefined)
    {
        const userWithId = {...user, id};
//////////////////////////////////////////////////////////////////////////////////
        await createuser(userWithId);
//////////////////////////////////////////////////////////////////////////////////////
        res.status(201).json({status:'ok'});
    }
    else{
        res.status(403).json({status:'user already exist'});
    }
}

export const getUserById = async (req,res) => {
    const {id} = req.params;
    const client = new MongoClient(uri)
    const userData = await userss.find((user) => user.id == id);
    // res.status(200).json({status:'Success', data:userData})
    if(userData == undefined){
        res.status(404).json({status:"User not found"});
    }
    else{
        res.status(200).json({status:'success', data:userData});
    }
}

export const deleteUserById = async(req,res) => {
    const {id} = req.params;
    const client = new MongoClient(uri)
    const alldata = await test.find({}).toArray();
    const deletedId = alldata.filter((user)=> user._id == id);
   
    if(deletedId.length > 0)
    { 
        test.deleteOne(deletedId[0],(err,obj)=>{
            if(err) throw err
            database.close()
        })
        res.status(200).json({status:'Success'});
    }
    else{
        res.status(200).json({status:'Data not found'});
    }
}

export const updateUser = (req,res) => {
    const {id} = req.params;
    const client = new MongoClient(uri)
    const user = userss.filter((user)=>user._id == id)
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
