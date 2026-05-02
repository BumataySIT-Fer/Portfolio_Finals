const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://20253253_db_user:llfPag0lTEYalFSd@ac-c0lg2vc-shard-00-00.cin4reg.mongodb.net:27017,ac-c0lg2vc-shard-00-01.cin4reg.mongodb.net:27017,ac-c0lg2vc-shard-00-02.cin4reg.mongodb.net:27017/apptech?ssl=true&replicaSet=atlas-uan24d-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => console.log("Succesfully Connected to mongo"))
    .catch(console.error);

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema, "Message");


app.post("/contact", async (req, res) => {
    try {
        const newMessage = await Message.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        res.status(200).json({ 
            message: "Message Sent! ",
            data: newMessage 
        });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Failed to send message!!!! " });
    }
});


app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.status(200).json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});


app.delete("/api/messages/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error deleting message:", err);
        res.status(500).json({ error: "Failed to delete message" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));