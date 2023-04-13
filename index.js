const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)
  let result = login(req.body.username,req.body.password)
  let token = generateToken(result)
  
  res.send(token)
})

app.get('/bye', (req, res) => {
    res.send('bye utem')
  })

app.get('/hai', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/register', (req, res) => {
    res.send('account created')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
let dbUsers= 
[
  {
    username: "wan",
    password: "123456",
    name:   "wan",
    email: "wanzacky99@gmail.com"
},
{
    username: "pedot",
    password: "password",
    name: "pedot",
    email: "pedot@yahoo.com"
},
{
    username: "meri",
    password: "54321",
    name:  "meri",
    email: "merimiaow@gmail.com"
}

]


function login(reqUsername, reqPassword)
  {
      let matchUser = dbUsers.find(
      x=> x.username == reqUsername)

      if(!matchUser)return "User not found!"
      if(matchUser.password == reqPassword)
      {
          return matchUser
      }
      else 
      {
          return "Invalid password"
      }
  }

  function register(reqUsername, reqPassword, reqName, reqEmail)
  {
      dbUsers.push
      (
        {
          username:reqUsername,
          password:reqPassword,
          name: reqName,
          email: reqEmail
         }
      )
        }
function generateToken(userData){
  const token = jwt.sign(
    userData,
    'inipassword',
    { expiresIn: 60 }
  );
  return token
}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err){
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}