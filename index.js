import cors from "cors";
import 'dotenv/config';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}


const mongoClient = await connectToMongoDB()

const db = mongoClient.db('wanderlast')
const destinationCollection = db.collection("destination")
const bookingCollection = db.collection("bookings")



app.post('/app-destination', async(req, res) =>{
    const data = req.body
    const result = await destinationCollection.insertOne(data)
    res.send(result)
})

app.get('/destinations', async(req, res) =>{
    const result = await destinationCollection.find().toArray()
    res.send(result)
})



app.get('/destinations/:id', async(req, res) =>{
    const {id} = req.params
    const result = await destinationCollection.findOne({_id: new ObjectId(id)})

    res.send(result)
})



app.patch('/destinations/:id', async(req, res) =>{
    const {id} = req.params
    const updatedData = req.body
    const result = await destinationCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedData}
    )

    res.json(result)
})

app.delete('/destinations/:id', async(req, res) =>{
    const {id} = req.params
    const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
    res.send(result)
})

app.post("/bookings", async(req, res) =>{
    const data = req.body
    const result = await bookingCollection.insertOne(data)
    res.send(result)
})


app.get("/mybookings/:email", async(req, res) =>{
    const {email} = req.params
    const result = await bookingCollection.find(
        {userEmail:email}).toArray()
    
    res.send(result)
})






// http://localhost:8000/
app.get('/', (req, res)=>{
    res.send({message: 'Server is running fine!' })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})