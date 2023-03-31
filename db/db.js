import {MongoClient} from 'mongodb';
import {ServerApiVersion} from 'mongodb'


const uri = "mongodb+srv://rajkumarr:popzein_helen_123@cluster0.lrnwsdq.mongodb.net/?retryWrites=true&w=majority"
const client = MongoClient(uri);


export const createuser = async(data) =>{
  try
  {
    const database = client.db("testing");

    const test = database.collection("test");

    const doc = data

    const result = test.insertOne(doc)

    console.log(`document was inserted ${result._id}`)
  }
  finally
  {
    await client.close();
  }
}

