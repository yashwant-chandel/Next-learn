// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient,ObjectId } from 'mongodb'
import { Resend } from 'resend'

// type Data = {
//   responseData : string,
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await MongoClient.connect("mongodb://localhost:27017/node-first")
  const todoCollection = client.db().collection("products")
  // let data1 = await todoCollection.find({}).toArray();
  const dataFromMongoDB = await todoCollection.find({}).toArray();
  

  // Include the data in the response
  res.status(200).json({ responseData:dataFromMongoDB });
}
