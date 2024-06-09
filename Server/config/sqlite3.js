const sqlite3=require('sqlite3').verbose();
exports.connecttodb=()=>{
    const database=new sqlite3.Database('./Gcom.db',sqlite3.OPEN_READWRITE,(err)=>{
        if(err)
            {
                console.log(err.message);
            }
            else{
                console.log("database is connected");
            }

    });

    return database;
}