const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
const users = [];

app.use(cors({
    origin: 'http://yourfrontend.vercel.app', 
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));

app.use(express.static(__dirname));

app.post("/contact", (req, res) => {
    const userData = req.body;
    console.log("Received user data:", userData);

    users.push(userData);

    res.json({
        message: "User data received successfully",
        data: users
    });
});

app.delete("/delete/:name", (req, res) => {
    const nameToDelete = req.params.name;
    const index = users.findIndex(user => user.name.toLowerCase() === nameToDelete.toLowerCase());

    console.log(`Trying to delete user: ${nameToDelete}`);

    if (index !== -1) {
        users.splice(index, 1);
        console.log("Users Array after deletion:", users);

        res.json({
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
