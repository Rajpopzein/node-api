import express from 'express';
import bodyParser from 'body-parser';
import usersRouts from './routs/users.js'
import cors from 'cors'

const app = express();


const PORT = 5000;

app.use(bodyParser.json())

app.use(cors({origin:'*',}))

app.use('/users', usersRouts)

app.get('/',(req,res) => {
    console.log('hello world');
    console.log(res,"------------");
    res.send("Let me Send A kutty Story");
})

app.listen(PORT,()=>{console.log(`file is running sucessfully ${PORT}`)})
