import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient,ObjectId } from 'mongodb'
import { Resend } from 'resend'
const bcrypt = require('bcryptjs');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method = 'post'){
      
    const client = await MongoClient.connect("mongodb://localhost:27017/Next-Learn");
    const todoCollection = client.db().collection("users")
    const userdata = await todoCollection.findOne({email:req.body.email});
    
    if(userdata){
      const comparepassword = await bcrypt.compare(req.body.password, userdata.password)
      // res.status(200).json(comparepassword);
        if(comparepassword == true){
          res.status(200).json({success:userdata});
        }else{
          res.status(500).json({error:'Password does not matched'});
        }
    }else{
        res.status(500).json({Error:"username does not exist"});
    }
  }else{
        res.status(200).json({error:'Something went wrong'});
  }
  }