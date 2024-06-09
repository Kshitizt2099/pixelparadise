const jwt=require('jsonwebtoken');

exports.jwtAuth=(req,res,next)=>{

    let token=req.headers['authorization'];
    console.log(token,"in jwt");
    token=token==='null'||undefined?null:token;
    if(!token )
        { 
           
            return res.status(401).send({error:'Unauthorized Users access from jwt Auth'});
        }

        try {
            const payload=jwt.verify(token,"4MAZqUDrUaADUO0hrd00ExIToH21y2kM",)
            req.payload=payload;
            
            
            
         } catch (error) {
            //4. Token coulde be invalid , token could be expired , or modified
            
           return res.status(401).send({error:'Wrong User'});
         }
       
       
       
        //if everything is fine
        next();
}