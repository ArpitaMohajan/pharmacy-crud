const express = require('express')

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())


// moon1156 pass
// moonDb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvbsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // console.log('hhhh')
        const database = client.db("pharmacy");
        const serviceCollection = database.collection("services");
        // get
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })
        // get single service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.json(service)
        })

        // Post
        app.post('/services', async (req, res) => {
            const service = req.body
            console.log('hit ')


            //     const service = {
            //         "name": "Prescribed Laboratory Services",
            //         "img": "https://th.bing.com/th/id/R.769464281cdcaeded99a927a35e1b2de?rik=IoJKxjBRs3XLyA&pid=ImgRaw&r=0",
            //         "description": "A hospital pharmacy is a department within a hospital that prepares, compounds, stocks and dispenses inpatient medications."
            //     }
            const result = await serviceCollection.insertOne(service);
            console.log(result)
            res.json(result)
        })
        // delete
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await serviceCollection.deleteOne(query)
            // console.log('kkl', result)
            res.json(result)
        })


    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);











app.get('/', (req, res) => {
    res.send('Genius Car Machine')
})
app.listen(port, () => {
    console.log('Listening to port', port)
})