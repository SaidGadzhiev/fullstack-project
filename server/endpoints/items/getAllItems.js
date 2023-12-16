const { MongoClient } = require("mongodb")
require("dotenv").config();
const {MONGO_URI} = process.env;

const getAllItems = async (req, res)=>{
    const client = new MongoClient(MONGO_URI);

    try{
        await client.connect();
        const db = await client.db("fullstackProject")

        const result = await db.collection("items").find().toArray()
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

module.exports = getAllItems;
