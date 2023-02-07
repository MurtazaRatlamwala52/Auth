const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
app.use(express.json());

const users = []

app.get('/', (req,res)=>{
    res.json(users)
})

app.post('/', async (req,res)=>{
    const hashpassword = await bcrypt.hash(req.body.password.toString() , 10)
    const user = {username: req.body.username, password: hashpassword}
    users.push(user)
    res.json(users)
})

app.post('/login', async (req,res)=>{
    try{
        const user = users.find(user => user.username == req.body.username)
        if(!user){
            res.status(400).send('Cannot find user')
            return
        }
            const flag = await bcrypt.compare(req.body.password, user.password)
            if(flag){
                res.send('Success')
            }else{
                res.status(401).send('Failure')
            }
        }catch{
            res.status(500).send('something went wrong')
        }
})

app.listen(5253, ()=>{
    console.log('Listening to port 5253')
})

// const numbers = [1, 2, 3, 6, 5];
// const result = numbers.find(number => number == 6);
// console.log(result);

// const users2 = [
//     { name: 'John', age: 25 },
//     { name: 'Jane', age: 30 },
//     { name: 'Jim', age: 35 }
//   ];
  
//   const result = users2.find(user => user.name = 'Hello');
//   console.log(result); // { name: 'Jim', age: 35 }