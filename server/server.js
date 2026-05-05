const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://20253253_db_user:llfPag0lTEYalFSd@ac-c0lg2vc-shard-00-00.cin4reg.mongodb.net:27017,ac-c0lg2vc-shard-00-01.cin4reg.mongodb.net:27017,ac-c0lg2vc-shard-00-02.cin4reg.mongodb.net:27017/apptech?ssl=true&replicaSet=atlas-uan24d-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => console.log("Succesfully Connected to mongo"))
    .catch(console.error);

// Message Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema, "Message");

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    teacherName: String,
    subject: String,
    rating: Number,
    comments: String,
    date: { type: Date, default: Date.now }
});
const Feedback = mongoose.model("Feedback", feedbackSchema, "Feedback");

// Message Routes
app.post("/contact", async (req, res) => {
    try {
        const newMessage = await Message.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        res.status(200).json({ message: "Message Sent!", data: newMessage });
    } catch (err) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

app.delete("/api/messages/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete message" });
    }
});

// Feedback Routes
app.get("/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
});

app.get("/feedback/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
});

app.post("/feedback", async (req, res) => {
    try {
        const newFeedback = await Feedback.create(req.body);
        res.status(200).json(newFeedback);
    } catch (err) {
        res.status(500).json({ error: "Failed to create feedback" });
    }
});

app.put("/feedback/:id", async (req, res) => {
    try {
        const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update feedback" });
    }
});

app.delete("/feedback/:id", async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete feedback" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));