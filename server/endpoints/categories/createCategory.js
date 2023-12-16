const { MongoClient, ObjectId } = require("mongodb")
require("dotenv").config();
const {MONGO_URI} = process.env;

const createCategory = async(req,res)=>{


    const client = new MongoClient(MONGO_URI);

    const newItem = req.body;
    console.log(newItem)

    try{
        await client.connect();
        const db = await client.db("fullstackProject")

        const result = await db.collection("categories").insertOne({_id: new ObjectId(), ...newItem})
        console.log(result)

        res.status(200).json({ status: 200, data: result });
    }
    catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
    finally{
        client.close()
    }

}

module.exports = createCategory