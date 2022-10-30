const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const port = process.env.PORT || 5002; 
const { MongoClient, ServerApiVersion } = require('mongodb');

app.get('/', (req, res)=> {
    res.send('Simple Node server is running ')
})

app.use(cors())
app.use(express.json())
const users = [
    {id: 1, name: 'Sabana', email: 'Sabana@gmail.com'}, 
    {id: 2, name: 'Bobita', email: 'bobita@gmail.com'}, 
    {id: 3, name: 'Sabnur', email: 'sabnur@gmail.com'}, 
]

//username : dbuser1
//Password: ct90uFRREFzUnj0f


const uri = "mongodb+srv://dbuser1:ct90uFRREFzUnj0f@cluster0.nm1iekw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
            const userCollection = client.db('simpleNode').collection('users'); 
            const user = {name: 'nahia Mahi', email: 'nahi@gmail.com'}
            // const result =  await userCollection.insertOne(user)
            // console.log(result)
            app.post('/users', async(req, res) => {
                const user = req.body; 
                // user.id == users.length + 1; 
               
               
                // users.push(user); 
                // console.log(user); 
                const result = await userCollection.insertOne(user); 
                console.log(result)
                user.id = result.insertedId
                res.send(user)
            })
        }
        finally{

        }
}
run().catch(err => console.error(err))




app.get('/users', (req, res)=> {
    if(req.query.name){
            const search = req.query.name; 
            const filtered = users.filter(usr => usr.name.toLowerCase.indexOf(search)>=0)
            res.send(filtered)
    }
    else{
        res.send(users)
    }
})
// app.post('/users', (req, res) => {
//     const user = req.body; 
//     user.id == users.length + 1; 
//     users.push(user); 
//     console.log(user)
//     res.send(user)
// })

app.listen(port, ()=> {
    console.log(`Simple not server running on Port ${port}`)
})