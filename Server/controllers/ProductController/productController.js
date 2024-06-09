const {connecttodb}=require('../../config/sqlite3');
const db=connecttodb();


exports.createTable=(req,res)=>{
    const sql="create table products(p_id int primary key,title varchar(20),desc varchar(100),price int ,Creators varchar(20),poster varchar(255),video varchar(255))";
    db.run(sql,[],(err)=>{
        if(err)
            {
                 return res.status(400).send({msg:"Table can't be created"});
            }
        else{
            return res.status(200).send({msg:"Table has been created"});
        }
    })
}

exports.createFavTable=(req,res)=>{
    const sql="create table fav(id int primary key,user_id,p_id)";
    db.run(sql,[],(err)=>{
        if(err)
            {
                 return res.status(400).send({msg:"Table can't be created"});
            }
        else{
            return res.status(200).send({msg:"Fav Table has been created"});
        }
    })
}
exports.createCartTable=(req,res)=>{
    const sql="create table cart(cart_id int primary key,user_id int ,p_id int,qty int ,title varchar(255),price int)";
    db.run(sql,[],(err)=>{
        if(err)
            {
                 return res.status(400).send({msg:"Table can't be created"});
            }
        else{
            return res.status(200).send({msg:"Cart Table has been created"});
        }
    })
}

exports.createProduct=(req,res)=>{
    const sql="insert into products(p_id ,title ,desc , price ,Creators ,poster,video) values(?,?,?,?,?,?,?)";
    const{ id,title,description,creators,Awards,price}=req.body;
    const poster=`http://localhost:4500/uploads/${req.files.poster[0].filename}`;
    const video=`http://localhost:4500/uploads/${req.files.video[0].filename}`;


    db.run(sql,[id,title,description,price,creators,poster,video],(err)=>{
        if(err)
            {
                console.log(err.message); 
                return res.status(400).send({msg:err.message});

            }
        else{
            return res.status(200).send({msg:"product has been created"});
        }
    })

    // db.run("delete from products where p_id=999",[],(err)=>{
    //     if(err)
    //         {
    //              return res.status(400).send({err:err.message});
    //         }
    //         else{
    //             console.log("deleted");
    //             return res.status(201).send({msg:"Deleted"});
                
    //         }
    // })
}

exports.getProducts=(req,res)=>{
    const sql="select * from products";
    db.all(sql,[],(err,rows)=>{
        if(err)
            {
                 return res.status(400).send({msg:"Table can't be created"});
            }
        else{
            if(rows)
                {
                    return res.status(200).send({products:rows});
                }
           
        }
    })
}

exports.getDetails=(req,res)=>{
    const sql="select * from products where p_id=?";
    const {id}=req.params;
    db.get(sql,[id],(err,rows)=>{
        if(err)
            {
                 return res.status(400).send({msg:"Table can't be executed"});
            }
        else{
            if(rows)
                {
                    return res.status(200).send({product:rows});
                }
            return res.status(401).send({msg:"No data found"});
           
        }
    })
    
}

exports.insertintocart=(req,res)=>
{
    
    const{user_id,p_id,title,price}=req.body;
    console.log(req.body);
   
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 100000); // 5 digit random number
    const uniqueNumber = timestamp * 100000 + randomComponent;
    const sql="insert into cart(cart_id,user_id,p_id,qty,title,price) values(?,?,?,?,?,?)";
    db.run(sql,[uniqueNumber,user_id,p_id,1,title,price],(err)=>{
      if(!err)
        {
            return res.status(201).send({msg:title+" inserted in to cart"})

        }
        else{
            return res.status(403).send({msg:"some issue"})
        }

    })
}

exports.getcart=(req,res)=>{
    const sql="select * from cart where user_id=?";
    const{id}=req.params;
    db.all(sql,[id],(err,rows)=>{
        if(err)
            {
                 return res.status(400).send({msg:"some issue has come"});
            }
        else{
            if(rows)
                {
                    let total=0;
                    rows.forEach((i)=>{total+=(i.price*i.qty)});
                    
                    return res.status(200).send({cart:rows,total});
                }
           
        }
    })
}

exports.deletetable=(req,res)=>
{
   const {name}=req.params;
    const sql="DROP TABLE cart";
   db.run(sql,[],(err)=>{
    if(err)
        {

        }
    else{
        return res.status(200).send({msg:"deleted "+name});
    }
   })
}

exports.incqtycart=(req,res,next)=>
{
  const {id,user_id}=req.params;
  const sql="update cart set qty=qty+1 WHERE cart_id = ?";
  db.run(sql,[id],(err)=>{
    if(err)
        {
            return res.status(403).send({err:err.message});
        }
    else{
       
        const selectSql = `SELECT * FROM cart where user_id=?`;
        db.all(selectSql, [user_id], (err, rows) => {
          if (err) {
            return res.status(403).send({ err: err.message });
          }
          let total=0;
                    rows.forEach((i)=>{total+=(i.price*i.qty)});
                    
                    return res.status(200).send({cart:rows,total});
        });

       
    }
  })

}

exports.deletecart=(req,res)=>{
   const {id,user_id}=req.params;
   console.log(id,user_id)
   const sql="delete from cart where cart_id=?";
 
   db.run(sql,[id],(err)=>{
    if(err)
        {
            console.log(err.message);
            return res.status(403).send({err:err.message});
        }
   
   })
   


 
}
exports.decqtycart=(req,res)=>{

    const {id,user_id}=req.params;
   
    const sql="update cart set qty=qty-1 WHERE cart_id = ?";
    db.run(sql,[id],(err)=>{
      if(err)
          {
              return res.status(403).send({err:err.message});
          }
      else{
         
          const selectSql = `SELECT * FROM cart where user_id=?`;
          db.all(selectSql, [user_id], (err, rows) => {
            if (err) {
              return res.status(403).send({ err: err.message });
            }
            let total=0;
                      rows.forEach((i)=>{total+=(i.price*i.qty)});
                      
                      return res.status(200).send({cart:rows,total});
          });
  
         
      }
    })

}