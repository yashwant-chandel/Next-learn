import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient,ObjectId } from 'mongodb'
import { Resend } from 'resend'

const bcrypt = require('bcryptjs');

// type Data = {
//     responseData: string,
//   }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method == 'POST'){
      const client = await MongoClient.connect("mongodb://localhost:27017/Next-Learn")
      const todoCollection = client.db().collection("users")
      const password = bcrypt.hashSync(req.body.password,10);
      const newArray = {
        username:req.body.username,
        email:req.body.email,
        password:password
      };
      // res.status(200).json(newArray);
      const emaildata = await todoCollection.findOne({email:req.body.email});
      if(!emaildata){
        const user = todoCollection.insertOne(newArray);
        res.status(200).json(user);
      }else{
        res.status(500).json({responseData:emaildata});
      }
    }else{
        res.status(200).json(req.body);
    }
  }