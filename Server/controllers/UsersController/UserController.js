const {connecttodb} = require('../../config/sqlite3');
const jwt=require("jsonwebtoken");
const db=connecttodb();

exports.SignIn=(req,res)=>{

    const{name,id,email,password}=req.body;
   
 const sql = "insert into users(id,name,email,password) values (?,?,?,?)";
db.run(sql,[id,name,email,password],(err)=>{
    if(err)
    {
        return res.status(400).send({msg:err.message});
        
    }
    else{
        return res.status(201).send({msg:"account created"});
    }
})

}


exports.LogIn=(req,res)=>{
    const sql = "select * from users where id=? and name=? and password=? and email=?";
    const{name,id,email,password}=req.body;
    console.log(req.body,"login");
    db.get(sql,[id,name,password,email],(err,row)=>{
        if(err)
            {
                return res.status(400).send({msg:err.message});
            }
        if(row)
            {
                 
                const token=jwt.sign(
                {
                   email,name,id
                },
                "4MAZqUDrUaADUO0hrd00ExIToH21y2kM",
                {
                   expiresIn:"1h"
                }
                
                )
                
                return res.status(201).send({token,id});
            }
            
            return res.status(400).send({msg:"No user Found !Invalid User"});
    
    }
    );
   



}
