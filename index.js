var express=require("express");
const cors = require('cors');
var app=express();
const PORT=3000;
app.use(express.json());
app.use(cors());

const users=[];

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

app.get("/home",(req,res)=>{
    res.sendFile("index.html",{ root: __dirname });
});

app.post("/contact",(req,res)=>{
    const userData=req.body;
    console.log("Received user data:",userData); 
    users.push(userData);
    res.json({
        message:"User data received successfully",
        data:users
    });
});

app.delete("/delete/:name",(req,res)=>{
    const nameToDelete=req.params.name;
    const index=users.findIndex(user=>user.name.toLowerCase()===nameToDelete.toLowerCase());

    if(index!==-1){
        users.splice(index,1);
        
        res.json({
            message:"User data deleted successfully",
            data:users
        });
    } else{
        res.status(404).json({ message: "User not found" });
    }
});
