import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('❌ Please add your Mongo URI to .env.local')
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
      .then(() => {
        console.log("✅ MongoDB connected (dev mode)")
        return client
      })
      .catch((err) => {
        console.error("❌ MongoDB connection failed (dev mode):", err)
        throw err
      })
  }
  clientPromise = global._mongoClientPromise
} else {
 
  client = new MongoClient(uri)
  clientPromise = client.connect()
    .then(() => {
      console.log("✅ MongoDB connected (prod mode)")
      return client
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed (prod mode):", err)
      throw err
    })
}

export default clientPromise
