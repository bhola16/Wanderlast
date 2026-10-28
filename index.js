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
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}


const mongoClient = await connectToMongoDB()
const db = mongoClient.db('wander-last')
const destinationCollection = db.collection("destinations")
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



app.get("/destinations/:id", async (req, res) => {
  const { id } = req.params;

  const destination = await destinationCollection.findOne({
    _id: new ObjectId(id),
  });

  res.send(destination);
});




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


app.post("/bookings", async (req, res) => {
  const data = req.body;

  if (!data.userEmail || !data.destinationId || !data.departureDate) {
    return res.status(400).json({
      message: "Missing required booking information.",
    });
  }

  // Check whether the user already has an active booking
  const existingBooking = await bookingCollection.findOne({
    userEmail: data.userEmail,
    destinationId: data.destinationId,
    status: { $in: ["pending", "confirmed"] },
  });

  if (existingBooking) {
    return res.status(409).json({
      message: "You have already booked this destination. Cancel your existing booking before booking again.",
    });
  }

  const result = await bookingCollection.insertOne(data);

  res.status(201).json({
    message: "Booking created successfully!",
    insertedId: result.insertedId,
  });
});



app.get("/mybookings/:email", async(req, res) =>{
    const {email} = req.params
    const result = await bookingCollection.find(
        {userEmail:email}).toArray()
    
    res.send(result)
})

app.delete("/mybookings/:id", async (req, res) => {
  const { id } = req.params;

  const result = await bookingCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
});


app.get("/bookings/check", async (req, res) => {
  const userEmail = req.query.userEmail;
  const destinationId = req.query.destinationId;

  if (
    typeof userEmail !== "string" ||
    typeof destinationId !== "string"
  ) {
    return res.status(400).json({
      message: "User email and destination ID are required.",
    });
  }

  const existingBooking = await bookingCollection.findOne({
    userEmail,
    destinationId,
    status: { $in: ["pending", "confirmed"] },
  });

  res.json({ booked: Boolean(existingBooking) });
});


// http://localhost:8000/
app.get('/', (req, res)=>{
    res.send({message: 'Server is running fine!' })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})