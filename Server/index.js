

//db.run("create table users(id int PRIMARY KEY,name varchar(20), email VARCHAR(50),password varchar(16))");


// const sql="select * from users";
// db.all(sql,[],(err,rows)=>{
//     if(err)
//     {
//         console.log(err.message);
//     }
//     else{
//        rows.forEach((row)=>{
//           console.log(row);
//        })
//     }
// })
// const sql = "DELETE FROM users";
// db.run(sql, [], (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("All rows deleted from the 'users' table");
//     }
// });
const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
// Apply CORS middleware before defining routes
server.use(cors());
//Format the data
server.use('/uploads',express.static( './public/uploads'));

// Import and use routes
server.use(require("./routes"));


server.listen(4500, () => {
    console.log("Server has been Started");
});
