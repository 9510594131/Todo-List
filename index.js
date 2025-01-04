const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'https://yourfrontend.vercel.app',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));

let users = [];

app.post("/contact", (req, res) => {
    const userData = req.body;
    console.log("Received user data:", userData);
    
    users.push(userData); 
    
    res.status(200).json({
        message: "User data received successfully",
        data: users
    });
});

app.delete("/delete/:name", (req, res) => {
    const nameToDelete = req.params.name;
    const index = users.findIndex(user => user.name.toLowerCase() === nameToDelete.toLowerCase());
    
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json({
            message: "User data deleted successfully",
            data: users
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
